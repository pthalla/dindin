const express = require('express')
const request = require('request')
const auth = require('./config')

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'))

app.get("/randomfood", (req, res, next) => {
  latitude = req.query.latitude
  longitude = req.query.longitude
  url = "https://api.yelp.com/v3/businesses/search?" + "term=food" + "&latitude=" + latitude + "&longitude=" + longitude
  
  var options = {
    url: url,
    headers: {
      "Authorization": auth
    }
  }

  request(options, (err, response, body) => {
    if (err) return console.log(err)
    var businesses = JSON.parse(body)
    var restaurantArr = businesses["businesses"];
    var randNum = Math.floor(Math.random() * restaurantArr.length)
    var restaurant = restaurantArr[randNum]
    if (restaurant == undefined) {
      console.log(restaurantArr)
      console.log(restaurantArr.length)
      console.log(randNum)
      res.send({})
    }
    din = {
      image: restaurant["image_url"],
      name: restaurant["name"],
      phone: restaurant["phone"],
      website: restaurant["url"]
    }

    res.send(din)
  })
  
})


const port = 3000;
app.listen(port, () => {
  console.log(`Dindin listening on port ${port}`)
})

