const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const request = require('request');


const argv = yargs
    .option({
        a: {
            demand:true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string:'true'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

// console.log(argv);
geocode.geocodeAddress(argv.address, (errorMsg, results)=>{
    if(errorMsg){
        console.log(errorMsg);
    }else{
        console.log(results.address, results.latitude, results.longitude);
        weather.getWeather(results.latitude, results.longitude, (errorMsg, weatherResults)=>{
            if(errorMsg){
                console.log(errorMsg);
            }else{
                console.log(`It's currenty ${weatherResults.temperature}. It feels like ${weatherResults.feelsLike}`);
            }
        });
    }
});

// var lat = 34.032519;
// var lng = -118.4801642;




