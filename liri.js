//requiring twitter NP
var twitter = require('twitter');
//requiring omdb NP
var omdbApi = require('omdb-client');
//requiring spotify NP
var spotify = require('spotify');
//requiring fs
var fs = require('fs');




processArgs(process.argv);

function processArgs(args) {

  var command = args[2];
// Twitter function
  if(command === "my-tweets"){
    var keys = require('./keys.js');
    var client = new twitter(keys);
    client.get('search/tweets', {q: 'Valynhall', count: '20'}, function(error, tweets, response) {
       console.log("");
       for (i = 0; i<tweets.statuses.length; i++) {
        console.log(tweets.statuses[i].created_at);
        console.log(tweets.statuses[i].text);
        console.log("");
      }
    });
  }

// Spotify function
  if(command === "spotify-this-song"){
    var song = args[3];
    if (song == "" || song == null) {
      song = "The Sign";
    }
    spotify.search({ type:"track", query:'track:"'+song+'"' }, function(err, data) {
      //console.log(data);
      console.log("");
      for(i = 0; i < data.tracks.items.length && i<1; i++){
        console.log("Artist:" + " " + data.tracks.items[i].album.artists[0].name);
        console.log("Album:" + " " + data.tracks.items[i].album.name);
        console.log("Song Name:" + " " + data.tracks.items[i].name);
        console.log("Preview Link:" + " " + data.tracks.items[i].preview_url);
        console.log("");
      }
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;
      }
    });
  }

//OMDB function
  if(command === "movie-this"){
    var movie = args[3];
    if (movie == "" || movie == null) {
      movie = "Mr. Nobody";
    }
    var params = {
      title: movie,
      type: "movie",
      incTomatoes: true,
      plot: "short"
  }
  omdbApi.get(params, function(err, data) {
    console.log("Title:" + " " + data.Title);
    console.log("Year:" + " " + data.Year);
    console.log("Actors:" + " " + data.Actors);
    console.log("Plot:" + " " + data.Plot);
    console.log("Country:" + " " + data.Country);
    console.log("Language:" + " " + data.Language);
    console.log("Rotten Tomatoes Rating:" + " " + data.tomatoRating);

      if(err) {
          return console.error(err);
      }
    });
  }

//Do What it says function
  if(command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data) {
      var dataArr = ["node","liri.js"];
      //console.log(data);
      var myvariable = data.split(",");
      //console.log(myvariable);
      dataArr = dataArr.concat(myvariable);
      //console.log(dataArr);
      processArgs(dataArr);
    });
  }
}
