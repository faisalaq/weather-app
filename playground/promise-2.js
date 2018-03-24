const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject)=>{
        console.log(address);
        var encodedAddress = encodeURIComponent(address);
        console.log(address);

        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
            }, (error, response, body) => {
            if(error){
                reject('Error, cannot connect to the server');
            }else if(body.status === 'ZERO_RESULTS'){
                reject('Invalid address');
            }else if(body.status==='OK'){
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        })
    });
};

geocodeAddress('91403').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=>{
    console.log(errorMessage);
})