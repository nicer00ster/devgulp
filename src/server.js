const express = require('express');
const next = require('next');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();

const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.DEVGULP_STRIPE_SECRET_KEY_TEST);

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const http = require('http').createServer(server);
  const io = require('socket.io')(http);

  io.on('connection', async function(socket) {
    let token = socket.handshake.query.token;

    if(token) {
      // const validation = axios({
      //   method: 'post',
      //   url: 'http://localhost:8000/wp-json/simple-jwt-authentication/v1/token/validate',
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   }
      // })
      //     .then(res => res)
      //     .catch(err => console.log(err));
      //
      // const userId = await validation.then(user => user.data.data.user_id);
      //
      // const user = axios({
      //   method: 'get',
      //   url: `http://localhost:8000/wp-json/wp/v2/users/${userId}`,
      // }).then(data => data);

      console.log('a user connected', token);
    }

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });

    socket.on('chat_message', async function(data) {
      if(data.token) {
        const validation = axios({
          method: 'post',
          url: 'http://localhost:8000/wp-json/simple-jwt-authentication/v1/token/validate',
          headers: {
            Authorization: `Bearer ${data.token}`,
          }
        })
        .then(res => res)
        .catch(err => console.log(err));

        const userId = await validation.then(user => user.data.data.user_id);

        const user = axios({
          method: 'get',
          url: `http://localhost:8000/wp-json/wp/v2/users/${userId}`,
        }).then(data => data);

        const userData = await user.then(user => user);
        const name = userData.data.name;

        console.log(`Message from ${name}: ${data.message}`);
        console.log(`To: ${data.messagingUser}`)
      }
    });
  });


  server.use(express.static('public'));

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.post('/charge', async (req, res) => {
    stripe.customers
      .create({
        email: req.body.token.email,
        card: req.body.token.id,
      })
      .then(customer => {
        stripe.charges.create({
          amount: req.body.amount,
          description: 'Donation to DevGulp!',
          currency: 'usd',
          customer: customer.id,
        });
      })
      .then(charge => {
        res.send(charge);
      })
      .catch(err => {
        console.log('Error: ', err);
        res.status(500).send({ error: 'Donation could not be completed.' });
      });
  });

  http.listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
