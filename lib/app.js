const express = require('express')
const request = require('request')
const auth = process.env.auth || require('../config/config.js')

// Use express to serve up the static files
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'))

// Calls the Yelp API to get nearby restaurants and responds with a random restaurant object
app.get("/randomfood", (req, res, next) => {
  // Gets the location from the request and creates url with Yelp API authorization
  latitude = req.query.latitude
  longitude = req.query.longitude
  url = "https://api.yelp.com/v3/businesses/search?" + "term=food" + "&latitude=" + latitude + "&longitude=" + longitude
  var options = {
    url: url,
    headers: {
      "Authorization": auth
    }
  }

  // Sends request to Yelp API
  request(options, (err, response, body) => {
    if (err) return console.log(err)
    var businesses = JSON.parse(body)
    var restaurantArr = businesses["businesses"];
    var randNum = Math.floor(Math.random() * restaurantArr.length) // Selects a random restaurant 
    var restaurant = restaurantArr[randNum]

    // Creates the restaurant object and sends it
    din = {
      image: restaurant["image_url"],
      name: restaurant["name"],
      phone: restaurant["phone"],
      website: restaurant["url"]
    }
    res.send(din)
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Dindin listening on port ${port}`)
});


/*

Sample Yelp response fields:

Image: "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
Name: "name": "Four Barrel Coffee"
Phone: "phone": "+14152520800"
Website: "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco"

*/
