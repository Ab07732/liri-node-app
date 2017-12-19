var keys = require("./keys.js");

var Twitter = require('twitter');

var Spotify = require('spotify');

var Request = require('request');
 
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret,
});
 
var params = {austinhb1993: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
          console.log(tweets[i].text)

    }
  }


 
var spotify = new Spotify({
  client_ID: keys.client_ID,
  client_secret: keys.client_secret,
});
  var writeToLog = function(data) {
   fs.appendFile("log.txt", '\r\n\r\n');

   fs.appendFile("log.txt", JSON.stringify(data), function(err) {
     if (err) {
      return console.log(err);
    }

     console.log("log.txt was updated!");
   });
 }

 //Creates a function for finding artist name from spotify
 var getArtistNames = function(artist) {
  return artist.name;
 };

 //Function for finding songs on Spotify
 var getMeSpotify = function(songName) {
   //If it doesn't find a song, find Blink 182's What's my age again
   if (songName === undefined) {
     songName = 'What\'s my age again';
        };

   spotify.search({ type: 'track', query: songName }, function(err, data) {
     if (err) {
      console.log('Error occurred: ' + err);
      return;
     }

     var songs = data.tracks.items;
    var data = []; //empty array to hold data

    for (var i = 0; i < songs.length; i++) {
       data.push({
         'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
         'preview song: ': songs[i].preview_url,
         'album: ': songs[i].album.name,
       });
     }
     console.log(data);
     writeToLog(data);
   });
 };
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {

    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
}); 

var request = new request({

 var getMeMovie = function(movieName) {

   if (movieName === undefined) {
     movieName = 'Mr Nobody';
   }

   var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";

   request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
       data.push({
       'Title: ' : jsonData.Title,
       'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
       'IMDB Rating: ' : jsonData.imdbRating,
       'Country: ' : jsonData.Country,
       'Language: ' : jsonData.Language,
       'Plot: ' : jsonData.Plot,
       'Actors: ' : jsonData.Actors,
       'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
       'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
   });
       console.log(data);
       writeToLog(data);
 }
 })
   });

 }

 var doWhatItSays = function() {
   fs.readFile("random.txt", "utf8", function(error, data) {
     console.log(data);
     writeToLog(data);
     var dataArr = data.split(',')

     if (dataArr.length == 2) {
       pick(dataArr[0], dataArr[1]);
     } else if (dataArr.length == 1) {
       pick(dataArr[0]);
     }

   });
 }

 var pick = function(caseData, functionData) {
   switch (caseData) {
     case 'my-tweets':
       getTweets();
       break;
     case 'spotify-this-song':
       getMeSpotify(functionData);
       break;
     case 'movie-this':
       getMeMovie(functionData);
       break;
     case 'do-what-it-says':
       doWhatItSays();
       break;
     default:
       console.log('LIRI doesn\'t know that');
   }
 }

 
 var runThis = function(argOne, argTwo) {
   pick(argOne, argTwo);
 };

 runThis(process.argv[2], process.argv[3]);


};


