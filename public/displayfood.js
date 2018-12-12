// Reloads the page (may ask browser to request permission for location again)
function showGeo() {
  location.reload()
}

$(document).ready(function() {
  // Show fake loader
  $("#fakeloader").fakeLoader({
    bgColor: "#C74E3D",
    timeToHide: 5000
  });
  $("#error").show()

  // Check if Geolocation is supported by Browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Ajax call to REST API
      url = "randomfood" + "?latitude=" + position.coords.latitude + "&longitude=" + position.coords.longitude
      $.get(url, function(res) {
        // Hide error message and end the fake loader
        $("#error").hide()
        $("#fakeloader").fakeLoader({
          bgColor: "#C74E3D",
          timeToHide: 800
        });
        
        // Show the landing div and populate the fields 
        $("#landingholder").show()
        $("#answerspan").text(res.name)
        $("#dinimage").attr("src", res.image)
        $("#dinname").text(res.name)
        $("#dinphone").text(res.phone)
        $("#dinwebsite").attr("href", res.website).attr("target", "_blank")
      });
    });
  } else {
    $("#answer").text("Geolocation is not supported by this browser");
  } 
});
