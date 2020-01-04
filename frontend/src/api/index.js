const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.DEVGULP_STRIPE_SECRET_KEY);
const server = express();

const handle = app.getRequestHandler();

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
      console.error('Error: ', err);
      res.status(500).send({
        error: 'Donation could not be completed.',
      });
    });
});

server.listen(3000, err => {
  if (err) throw err;
  console.log('> Ready on http://localhost:3000');
});
