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
var queryStr = "";
var queryPage = 1;

//connect to goole customer search engine
const GoogleImages = require('google-images');
 
const client = new GoogleImages('017999513681578927553:hwq-m42zzwq', 'AIzaSyDzJHUKZc1WuqYczCjCU7KZ5SYsxHTd7e0');


//connect to mongoDB
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var test = require('assert');
// // Connection URL. This is where your mongodb server is running.

// //(Focus on This Variable)
var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)
var collection;



app.get("/api/imagesearch/:str", function (request, response) {
  // console.log(getAllUrlParams(request.url).offset);
  // console.log(request.params.str);
  queryStr = request.params.str.toString();
  queryPage = parseInt(getAllUrlParams(request.url).offset);
  var dreams = [];
  


	client.search(queryStr , {page: queryPage}).then(function (images){
  //var gambar = JSON.parse(images)
  console.log(images.length);
  //console.log(images[0].thumbnail.description);
  for(var i = 0; i < images.length; i++){
    var oneDream = {};
    oneDream["url"] = images[i].url;
    oneDream["thumbnail-url"] = images[i].thumbnail.url;
    oneDream["thumbnail-description"] = images[i].thumbnail.description;
    oneDream["thumbnail-parentPage"] = images[i].thumbnail.parentPage;
    dreams.push(oneDream);
  }
    
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
      console.log('Connection established to ', url);

      // Create a collection
      collection = db.collection('Image-Search-Abstraction-Layer');
      // Insert the docs
      var id = Date.now();
      collection.insertOne({"_id":id, "data": dreams});
      db.close();
      response.send(dreams);

      }
  })
  
	});
  
});

app.get("/api/latest/imagesearch/", function (request, response) {
  
  
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
      console.log('Connection established to ', url);

      // Create a collection
      collection = db.collection('Image-Search-Abstraction-Layer');
      // Insert the docs
      var result = collection.find().sort({_id:1}).limit(1);
      // collection.findOne({ '_id' : 1499810823184 }, function(err, docs) {
      // if(err) if(err) throw err;
      // if(docs == null) {
      //   response.status(404).json({error:"This data is not on the database."});
      // }
      // else {
      //   db.close();
      //   response.send(docs.data);
      // }    
  // });
      console.log(typeof result);
      console.log(result);
      db.close();
      response.send("result");
      }
  })
  
  // console.log(result);
  // response.send(result);
  
});
// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// app.post("/", function (request, response) {
//   dreams.push(request.query.dream);
//   response.sendStatus(200);
// });

// Simple in-memory store for now




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