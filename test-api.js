var request = require('request');
var parseString = require('xml2js').parseString;

var url;

// url = 'https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
// request(url, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the HTML for the Google homepage.
//   }
// });

setTimeout(function() {
  console.log('Goodbye');
}, 1000);

// url = `http://api.amp.active.com/search?${query}&api_key=${key}`

let usState = 'GA';
let apiKey = '9q9v48gqwukruer9c3ttvb3n';
url = `http://api.amp.active.com/camping/campgrounds/?pstate=${usState}&api_key=${apiKey}`
//http://api.amp.active.com/camping/campgrounds/?pstate=GA&pname=Red&siteType=10001&amenity=4006&water=3006&pull=3008&pets=3010&waterfront=3011&api_key=9q9v48gqwukruer9c3ttvb3n
console.log('url:', url);
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(typeof body);
    console.log('body:', body);
    console.log('\n\n\n');
    var json = parseString(body);
    console.log('json:', json); // Show the XML response body
  }
});


