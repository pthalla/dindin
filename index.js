const express = require('express')
const request = require('request')
const path = require('path')

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = 3000;

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get("/getyelp", (req, res, next) => {
  
  latitude = req.query.latitude
  longitude = req.query.longitude
  currLocationUrl = "https://api.yelp.com/v3/businesses/search?" + "latitude=" + latitude + "&longitude=" + longitude
  
  var options = {
    url: currLocationUrl,
    headers: {
      "Authorization": "Bearer R6UQ9Bo69yCYGotwB92dM6Avee1LXZHmENKy6h033HIEvZm9_6Bojcrfaid5bMX3ire_twHfeF6pstgrT0Xy3YWreqJbIIo4QjL-spfJVPErA528Z22_LuYOYQkLXHYx"
    }
  }

  request(options, (err, response, body) => {
    if (err) return console.log(err)
    info = JSON.parse(body)
    res.send(info)
  })
  
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
