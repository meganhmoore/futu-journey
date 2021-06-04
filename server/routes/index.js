var express = require('express');
var router = express.Router();
const request = require('superagent');
const { createScanner } = require('typescript');
require('dotenv').config()

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send(`CODE: ${req.query.code}`);
  requestAccessToken(req.query.code,req.query.state)
  .then((response) => {
    requestProfile(response.body.access_token)
    .then(response => {
      //console.log(response.body)
      res.send(response.body)
    })
  })
  .catch((error) => {
    res.status(500).send(`${error}`)
    console.error(error)
  })
});

function requestAccessToken(code, state) {
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT}`)
    .send(`client_id=${process.env.EXPRESS_APP_CLIENT_ID}`)
    .send(`client_secret=${process.env.EXPRESS_APP_CLIENT_SECRET}`)
    .send(`code=${code}`)
    .send(`state=${state}`)
}

function requestProfile(token) {
  return request.get('https://api.linkedin.com/v2/me')
  .set('Authorization', `Bearer ${token}`)
  // return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
  // .set('Authorization', `Bearer ${token}`)
}

module.exports = router;
