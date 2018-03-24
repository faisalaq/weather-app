const yargs = require('yargs');
const axios = require('axios');


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

    var encodedAddress = encodeURIComponent(argv.address);
    var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address');
        }
        console.log(response.data);
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.darksky.net/forecast/3f1004e6049751ae8262f66c05f4429e/${lat},${lng}`;
        return axios.get(weatherUrl);
    }).then((response)=>{
        var temperature = response.data.currently.temperature;
        var feelsLike = response.data.currently.apparentTemperature;
        console.log(`It's currenty ${temperature}. It feels like ${feelsLike}`);
    }).catch((e) => {
        if(e.code==='ECONNREFUSED'){
            console.log('server refused connection');
        }else{
            console.log(message);
        }
    }); 





