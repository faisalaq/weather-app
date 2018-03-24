const request = require('request');
const yargs = require('yargs');

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

console.log(argv);
var address = encodeURIComponent(argv.address);


request({
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body)=>{
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Location: Lat ${body.results[0].geometry.location.lat}, Lng ${body.results[0].geometry.location.lng}`);
})