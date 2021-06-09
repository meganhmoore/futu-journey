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
    const clientData = {};
    requestProfile(response.body.access_token)
    .then((response) => {
      //console.log(response.body)
      clientData['main'] = response.body;
      //res.redirect('http://localhost:3000/journey').set('body', response.body)
    })
    requestPic(response.body.access_token)
    .then((response) => {
      const photoData = response.body.profilePicture;
      const temp = photoData["displayImage~"]["elements"][photoData["displayImage~"]["elements"].length -1]
      clientData['picUrl'] = temp["identifiers"][0]["identifier"]
      const redirectUrl = `http://localhost:3000/journey?name=${clientData["main"]["localizedFirstName"]}&lastName=${clientData["main"]["localizedLastName"]}&url=${clientData["picUrl"]}&id=${clientData["main"]["id"]}&country=${clientData["main"]["firstName"]["preferredLocale"]["country"]}`
      res.redirect(redirectUrl);
    })
    .catch((error) => {
      res.status(500).send(`${error}`)
      console.error(error)
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
  return request.get('https://api.linkedin.com/v2/me').set('Authorization', `Bearer ${token}`)
}

function requestPic(token){
  return request.get(`https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))`).set('Authorization', `Bearer ${token}`)
  // return request.get('https://api.linkedin.com/v2/me?projection=(id,position,localizedFirstName,localizedLastName,industry)').set('Authorization', `Bearer ${token}`)
}

module.exports = router;

