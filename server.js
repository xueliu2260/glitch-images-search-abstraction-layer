




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

const GoogleImages = require('google-images');

const client = new GoogleImages('002557128220856549060:icz8qa-lijq', 'AIzaSyD1DxIyGUgW8AoA6CtawmvVk9eepR-mjXM');

// client.search('Steve Angello')
// 	.then(images => {
// 		/*
// 		[{
// 			"url": "http://steveangello.com/boss.jpg",
// 			"type": "image/jpeg",
// 			"width": 1024,
// 			"height": 768,
// 			"size": 102451,
// 			"thumbnail": {
// 				"url": "http://steveangello.com/thumbnail.jpg",
// 				"width": 512,
// 				"height": 512
// 			}
// 		}]
// 		 */
// 	});

// // paginate results
// client.search('Steve Angello', {page: 2}).then(function(images){
//   console.log("here");
//   console.log(images.length);
// });

// var mongodb = require('mongodb');

// //We need to work with "MongoClient" interface in order to connect to a mongodb server.
// var MongoClient = mongodb.MongoClient;
// var test = require('assert');
// // // Connection URL. This is where your mongodb server is running.

// // //(Focus on This Variable)
// var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)
// var collection;
// MongoClient.connect(url, function (err, db) {
// if (err) {
//   console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//   console.log('Connection established to ', url);

//   // Create a collection
//   collection = db.collection('url-shortener-database');
//   // Insert the docs
  

//   }
// })
var querySearch = "";
var queryPage = 1;

app.get("/api/imagesearch/:str", function (request, response) {
  var results = [];
  querySearch = request.params.str;
  queryPage = parseInt(getAllUrlParams(request.url).offset);
  // console.log(querySearch);
  // console.log(queryPage);
  // client.search("a").then(function(images){
  //   console.log(images.length);
  // //   for(var i = 0; i < images.length; i++){
  // //     var result = {};
  // //     result["thumbnail-description"] = images[i].thumbnail.description;
  // //     result["thumbnail-parentPage"] = images[i].thumbnail.parentPage;
  // //     result["thumbnail-url"] = images[i].thumbnail.url;
  // //     result["url"] = images[i].url;
  // //     results.push(result);
  // //   }
  // //   console.log(results);
  // //   
  // });
  //client.search('Steve Angello', {page: 2});
  response.send("results");
});

  



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      paramValue = paramValue.toLowerCase();

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }

  return obj;
}