var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  res.send("hello")
});
router.get("/auth", (req, res) => {

  console.log(req.query)
  const code = req.query.code;
  // let redirect_uri = "http://localhost:4000/auth"
  let redirect_uri = "http://localhost:8080/line-login"
  // let redirect_uri = "http://localhost:8080/auth"
  // const requestOptions = {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   body: JSON.stringify({
  //     "grant_type": "authorization_code",
  //     "code": code,
  //     "redirect_uri": redirect_uri,
  //     "client_id": "1657857854",
  //     "client_secret": "cfb982fbe7dc24d40ec779ec59cf02e5",
  //   })
  // };
  // console.log("Aaaa")
  // fetch('https://api.line.me/oauth2/v2.1/token', requestOptions)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data)
  //     debugger
  //   });


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



  request(options, function (error, response, body) {

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

      console.log(body);
      res.json(JSON.parse(body))

    })

  })

});
router.get("/access-token", (req, res) => {

  // console.log(req)


});



module.exports = router;
