const request = require('postman-request');

const baseWeatherUrl = 'http://api.weatherstack.com'

const forecast = (latitude, longitude, callback) => {
    const weatherCurrentUrl = baseWeatherUrl + '/current?access_key=4711b12f4dc30192a242758061fc18bc&query=' + latitude + ',' + longitude +'&units=m'
    request({url:weatherCurrentUrl,json:true }, (error, {body}) => {
        console.log(body)
        if (error)
        {
            callback('Unable to connect to the weather services!', undefined)
        }
        else if(!body.current){
            callback('Unable to find location. Try another search!', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degrees out, There is a ' + body.current.precip + '% chance of rain.')
        }
    });
}

module.exports = forecast