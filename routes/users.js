var express = require('express');
var router = express.Router();
var request = require('request');

router.get("/", (req, res) => {
  res.send("hello")
});
router.get("/auth", (req, res) => {

  console.log(req.query)
  const code = req.query.code;
  console.log(code)
  // let redirect_uri = "http://localhost:4000/auth"
  let redirect_uri = "http://localhost:8080/line-login"
  // let redirect_uri = "https://rolling-papers.netlify.app/line-login"


  var options = {
    url: 'https://api.line.me/v2/oauth/accessToken',
    method: 'POST',

    form: {
      "grant_type": "authorization_code",
      "code": code,
      "redirect_uri": redirect_uri,
      "client_id": "1657857854",
      "client_secret": "cfb982fbe7dc24d40ec779ec59cf02e5",
    }
  }

  console.log('https://api.line.me/v2/oauth/accessToken');


  request(options, function (error, response, body) {

    console.log(error);
    console.log(response.body);

    let accessToken = JSON.parse(body).access_token
    var headers = {
      'Authorization': `Bearer ${accessToken}`
    }

    var options = {
      url: 'https://api.line.me/v2/profile',
      method: 'GET',
      headers: headers,
    }



    request(options, function (error, response, body) {

      console.log(error);

      console.log(body);
      res.json(JSON.parse(body))

    })

  })

});
router.get("/access-token", (req, res) => {

  // console.log(req)


});



module.exports = router;
