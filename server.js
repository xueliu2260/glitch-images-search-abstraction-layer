// server.js
// where your node app starts

// init project




var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// Simple in-memory store for now
var dreams = [];
const GoogleImages = require('google-images');
 
const client = new GoogleImages('017999513681578927553:hwq-m42zzwq', 'AIzaSyDzJHUKZc1WuqYczCjCU7KZ5SYsxHTd7e0');


	client.search('dogs' , {page: 2}).then(function (images){
		//var gambar = JSON.parse(images)
		// console.log(images.length);
		//console.log(images[0].thumbnail.description);
    var oneDream = {};
    oneDream["url"] = images[0].url;
    oneDream["thumbnail-url"] = images[0].thumbnail.url;
    oneDream["thumbnail-description"] = images[0].thumbnail.description;
    oneDream["thumbnail-parentPage"] = images[0].thumbnail.parentPage;
    dreams.push(oneDream);
	});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
