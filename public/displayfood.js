$(document).ready(function() {
  $("#fakeloader").fakeLoader();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      url = "http://localhost:3000/randomfood" + "?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude
      $.get(url, function(res) {
        $("#answer").text(res.name + " is for din din")
        $("#dinimage").attr("src", res.image)
        $("#dinname").text(res.name)
        $("#dinphone").text(res.phone)
        $("#dinwebsite").attr("href", res.website).attr("target", "_blank")
        console.log(res)
      });
    }, function(err) {
      console.log(err) // TODO: better error handling
    });
  } else {
    $("#answer").text("Geolocation is not supported by this browser");
  } 

  
});

/*
Image: "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",

Name: "name": "Four Barrel Coffee"

Phone: "phone": "+14152520800"

Website: "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco"


*/



