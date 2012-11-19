#!/usr/bin/env node
var request = require('request')
  , key = (process.argv[ 2 ])
  , api = "http://api.wunderground.com/api/"+key+"/"
  , util = require( "util" )
  , zip = (process.argv[ 3 ] || "60647")
  , iconMap = { 'chancerain': '='
              , 'chancetstorms': 'z'
              , 'chancesnow': ']'
              , 'chanceflurries': ']'
              , 'chancesleet': '9'
              , 'clear': 'v'
              , 'sunny': 'v'
              , 'rain': '3'
              , 'mostlysunny': '1'
              , 'partlycloudy':'1'
              , 'partlysunny': '1'
              , 'mostlycloudy': '1'
              , 'fog': 's'
              , 'hazy': 'g'
              , 'overcast': '`'
              , 'unknown': '$'
              , 'cloudy': '`'
              , 'snow': ']'
              , 'flurries': ']'
              , 'sleet': '9'
              , 'tstorms': 'z' };

if(key == null){
  util.puts('you must enter a wunderground api key.');
  return false;
}

request({uri: api+'conditions/forecast/q/'+zip+'.json'}, function(err, resp, body){
  var weather = JSON.parse(body);
  //console.log(weather.current_observation);
  var arg = (process.argv[ 4 ] || "temp_f");
  switch(arg){
    case 'icon':
      util.puts(iconMap[weather.current_observation[arg]]);
      break;
    default:
      util.puts(weather.current_observation[arg]);
  }
});
