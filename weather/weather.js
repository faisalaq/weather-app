const request = require('request');


var getWeather = (lat, lng, callback)=>{

    request({
    url: `https://api.darksky.net/forecast/3f1004e6049751ae8262f66c05f4429e/${lat},${lng}`,
    json: true 
    }, (error, response, body)=>{
        if(!error && response.statusCode===200){
            callback(undefined, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            });
        }else if(response.statusCode===400){
            callback('unable to fetch the address');
        }else{
            callback('unable to connect to the server');
        }

    })
}

module.exports.getWeather = getWeather;