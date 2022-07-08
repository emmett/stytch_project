const express = require("express");
const path = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const stytch = require("stytch");
const database = require("./database.js");

require("dotenv").config();

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
  env: stytch.envs.test,
});

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());

app.get("/logout", function (req, res) {
  req.session.authenticated = false
  res.redirect("/");

});

app.get("/", function (req, res) {
  if (req.session.authenticated) {
    res.redirect("/home");
    return;
  }
  res.sendFile(path.join(__dirname, "public", "signupOrLogin.html"));

  // res.sendFile(path.join(__dirname, "public", "login_sfdc.html"));
});

app.get("/home", function (req, res) {
  if (!req.session.authenticated) {
    res.redirect("/");
    return;
  }

  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// app.get("/oauth", function (req, res) {
//   var token = req.query.token;
//   console.log('CLIENT')
//   console.log(req.params.stytch_token_type)
//   console.log(client)

//   if
//   client.oauth.authenticate(token)
//     .then(resp => {
//       req.session.authenticated = true;
//       req.session.save(function (err) {
//         if (err) console.log(err);
//       });
//       res.redirect("/home");
//       console.log(resp)
//     })
//     .catch(err => {
//       console.log(err)
//       res.send("There was an error authenticating the user.");
//     });
// });

app.get("/authenticate", function (req, res) {
  var token = req.query.token;
  console.log(req.params)
  var type  = req.query.stytch_token_type
  console.log(type)
  switch (type) {
   case "oauth": 
    client.oauth.authenticate(token)
      .then(resp => {
        req.session.authenticated = true;
        req.session.save(function (err) {
          if (err) console.log(err);
        });
        res.redirect("/home");
        console.log(resp)
      })
      .catch(err => {
        console.log(err)
        res.send("There was an error authenticating the user.");
      });
      break;
    case "magic_links":
      client.magicLinks.authenticate(token)
        .then((response) => {
          req.session.authenticated = true;
          req.session.save(function (err) {
            if (err) console.log(err);
          });
          res.redirect("/home");
        })
        .catch((error) => {
          console.log(error);
          res.send("There was an error authenticating the user.");
        });
      break;
    default:
      console.log(type)
    
  }

});

app.listen(9000, () => {
  console.log('The application is listening on port 9000.');
  console.log('You can now view it in the browser: \033[1m\033[4mhttp://localhost:9000\033[0m');
});
