




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
var getUri;
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
var test = require('assert');
// // Connection URL. This is where your mongodb server is running.

// //(Focus on This Variable)
var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// //(Focus on This Variable)
var collection;
MongoClient.connect(url, function (err, db) {
if (err) {
  console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
  console.log('Connection established to ', url);

  // Create a collection
  collection = db.collection('url-shortener-database');
  // Insert the docs
  

  }
})
app.get("/new/:shortcode", function (request, response) {
  var shortCode = parseInt(request.params.shortcode);
  //console.log("here");
  collection.findOne({ '_id' : shortCode }, function(err, docs) {
    if(err) if(err) throw err;
    if(docs == null) {
      response.status(404).json({error:"This url is not on the database."});
    }
    else {
      response.redirect(docs.url);
    }    
  });
});
app.get("/new/*", function (request, response) {
  getUri = request.params[0].toString();
  var size = Date.now();
    console.log(getUri);
  if(validateUrl(getUri)){
    collection.insertOne({"_id":size, "url": getUri});
    response.status(200).json({_id:size, url:getUri});
  }else{
    response.status(500).json({error:"This url is not valid."});
  }
  

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});




































// 	client.search(queryStr , {page: queryPage}).then(function (images){
// 	});
 
  
  
  
  
  
  
  
    
      
      
      
          
            
//             // Let's close the db
//             db.close();
//             result.ok(err != null);
//           // Show that the cursor is closed
//           // put the value at that index number
//           // put the value on the end of the array
//           db.close();
//           obj[paramName] = [obj[paramName]];
//           obj[paramName].push(paramValue);
//           obj[paramName][paramNum] = paramValue;
//           response.send(item.data);
//           result.toArray(function(err, items) {
//           });
//         // If the item is null then the cursor is exhausted/empty and closed
//         // convert value to array (if still string)
//         // if array index number specified...
//         // if no array index number specified...
//         //console.log(result.pretty());
//         else {
//         if (typeof obj[paramName] === 'string') {
//         if (typeof paramNum === 'undefined') {
//         if(item == null) {
//         obj[paramName] = paramValue;
//         paramNum = v.slice(1,-1);
//         return '';
//         }
//         }
//         }
//         }
//         }else{
//       // (optional) keep case consistent
//       // Create a collection
//       // Create a collection
//       // Insert the docs
//       // Insert the docs
//       // if param name doesn't exist yet, set it
//       // if parameter name already exists
//       // in case params look like: list[]=thing1&list[]=thing2
//       // separate the keys and the values
//       // set parameter value (use 'true' if empty)
//       collection = db.collection('Image-Search-Abstraction-Layer');
//       collection = db.collection('Image-Search-Abstraction-Layer');
//       collection.insertOne({"_id":id, "data": dreams});
//       console.log('Connection established to ', url);
//       console.log('Connection established to ', url);
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//       console.log('Unable to connect to the mongoDB server. Error:', err);
//       db.close();
//       else {
//       if (obj[paramName]) {
//       paramName = paramName.toLowerCase();
//       paramValue = paramValue.toLowerCase();
//       response.send(dreams);
//       result.each(function(err, item) {
//       var a = arr[i].split('=');
//       var id = Date.now();
//       var paramName = a[0].replace(/\[\d*\]/, function(v) {
//       var paramNum = undefined;
//       var paramValue = typeof(a[1])==='undefined' ? true : a[1];
//       var result = collection.find().sort({_id:-1}).limit(1);
//       }
//       }
//       }
//       } else {
//       } else {
//       });
//       });
//     // split our query string into its component parts
//     // stuff after # is not part of query string, so get rid of it
//     dreams.push(oneDream);
//     for (var i=0; i<arr.length; i++) {
//     if (err) {
//     if (err) {
//     oneDream["thumbnail-description"] = images[i].thumbnail.description;
//     oneDream["thumbnail-parentPage"] = images[i].thumbnail.parentPage;
//     oneDream["thumbnail-url"] = images[i].thumbnail.url;
//     oneDream["url"] = images[i].url;
//     queryString = queryString.split('#')[0];
//     var arr = queryString.split('&');
//     var oneDream = {};
//     }
//     }
//   // console.log(getAllUrlParams(request.url).offset);
//   // console.log(request.params.str);
//   // console.log(result);
//   // get query string from url (optional) or window
//   // if query string exists
//   // response.send(result);
//   // we'll store the parameters here
//   //console.log(images[0].thumbnail.description);
//   //var gambar = JSON.parse(images)
//   MongoClient.connect(url, function (err, db) {
//   MongoClient.connect(url, function (err, db) {
//   console.log('Your app is listening on port ' + listener.address().port);
//   console.log(images.length);
//   for(var i = 0; i < images.length; i++){
//   if (queryString) {
//   queryPage = parseInt(getAllUrlParams(request.url).offset);
//   queryStr = request.params.str.toString();
//   response.sendFile(__dirname + '/views/index.html');
//   return obj;
//   var dreams = [];
//   var obj = {};
//   var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
//   }
//   }
//   })
// //   dreams.push(request.query.dream);
// //   response.sendStatus(200);
// // // Connection URL. This is where your mongodb server is running.
// // //(Focus on This Variable)
// // //(Focus on This Variable)
// // Simple in-memory store for now
// // app.post("/", function (request, response) {
// // but feel free to use whatever libs or frameworks you'd like through `package.json`.
// // could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
// // http://expressjs.com/en/starter/basic-routing.html
// // http://expressjs.com/en/starter/static-files.html
// // init project
// // listen for requests :)
// // server.js
// // we've started you off with Express, 
// // where your node app starts
// // });
// //We need to work with "MongoClient" interface in order to connect to a mongodb server.
// //connect to goole customer search engine
// //connect to mongoDB
// app.get("/", function (request, response) {
// app.get("/api/imagesearch/:str", function (request, response) {
// app.get("/api/latest/imagesearch/", function (request, response) {
// app.use(express.static('public'));
// const GoogleImages = require('google-images');
// const client = new GoogleImages('017999513681578927553:hwq-m42zzwq', 'AIzaSyDzJHUKZc1WuqYczCjCU7KZ5SYsxHTd7e0');
// function getAllUrlParams(url) {
// var MongoClient = mongodb.MongoClient;
// var app = express();
// var collection;
// var express = require('express');
// var listener = app.listen(process.env.PORT, function () {
// var mongodb = require('mongodb');
// var queryPage = 1;
// var queryStr = "";
// var test = require('assert');
// var url = 'mongodb://liuerbaozi2260:zja900530@ds137220.mlab.com:37220/glitch-project';      
// }
// })
// });
// });
// });
// });88