const request = require('postman-request');

const baseMapBoxUrl = 'https://api.mapbox.com/geocoding/v5'

const geocode = (address, callback) => {
    const mapBoxPlacesUrl = baseMapBoxUrl + '/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FkYWF0YWxpIiwiYSI6ImNrdHBrdHA1NjBoN2oyb2w4cGhrN3Fsc3EifQ.hdfnhABr9BK81vCoGvz_HA'

    request({url:mapBoxPlacesUrl,json:true }, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to the locations services!', undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    });
}

module.exports = geocode