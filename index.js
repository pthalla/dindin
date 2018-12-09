const http = require('http')
const express = require('express')
const request = require('request')
const geoip = require('geoip-lite')

var options = {
  url: "https://api.yelp.com/v3/businesses/search?location=\"nyc\"",
  headers: {
    "Authorization": "Bearer R6UQ9Bo69yCYGotwB92dM6Avee1LXZHmENKy6h033HIEvZm9_6Bojcrfaid5bMX3ire_twHfeF6pstgrT0Xy3YWreqJbIIo4QjL-spfJVPErA528Z22_LuYOYQkLXHYx"
  }
}

// // // request(options, (err, res, body) => {
// // //   if (err) return console.log(err)

// // //   info = JSON.parse(body)
// // //   console.log(info)
// // // })

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  
  var geo = geoip.lookup("179.232.195.141")
  
  console.log(geo)
  console.log(req.ip)
//   // geo.getCurrentPosition((err, position) => {
//   //   if (err) console.log(err)
  
//   //   console.log(position)
//   // })
  res.send("hello world")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
