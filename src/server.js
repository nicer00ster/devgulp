const express = require("express");
const next = require("next");
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const { google } = require("googleapis");
// const dotenv = require('dotenv');
// dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// const OAuth2 = google.auth.OAuth2;

// async function sendEmail(name, email, message) {
//     const oauth2Client = new OAuth2(
//         process.env.CLIENT_ID,
//         process.env.CLIENT_SECRET,
//         "https://developers.google.com/oauthplayground" // Redirect URL
//     );
//
//     oauth2Client.setCredentials({
//         refresh_token: process.env.REFRESH_TOKEN
//     });
//
//     const tokens = await oauth2Client.refreshAccessToken();
//
//     const accessToken = tokens.credentials.access_token;
//
//     const smtpTransport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: process.env.EMAIL,
//             clientId: process.env.CLIENT_ID,
//             clientSecret: process.env.CLIENT_SECRET,
//             refreshToken: process.env.REFRESH_TOKEN,
//             accessToken: accessToken
//         }
//     });
//
//     const mailOptions = {
//         from: name,
//         to: 'abusch1013@gmail.com',
//         subject: `New message from ${name}!`,
//         text: message,
//         replyTo: email,
//     };
//
//     let promise = new Promise((res, reject) => {
//         smtpTransport.sendMail(mailOptions, (error, response) => {
//             error ? reject(error) : res(response);
//             smtpTransport.close();
//         });
//     });
//
//     let response = await promise;
//
//     return response;
// }

app.prepare().then(() => {
  const server = express();

  // server.use(bodyParser.json());

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.get("/post/:id", (req, res) => {
    return app.render(req, res, "/post", { id: req.params.id });
  });

  server.get("/user/:userId", (req, res) => {
    return app.render(req, res, "/user", { userId: req.params.userId });
  });

  // server.post('/api/contact', (req, res) => {
  //     const { name, email, message } = req.body;
  //     sendEmail(name, email, message)
  //         .then(data => {
  //             res.send({ response: data.response });
  //         })
  //         .catch(err => {
  //             res.send({ error: err });
  //         });
  // });

  server.listen(3000, err => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
