const request = require( 'postman-request' );

const forecast = ( latitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=1adcd009f226c6a7438928c9d56fa77d&query=' + latitude + ',' + longitude;

    request( {
        url,
        json: true
    }, ( error, response ) => {
        if ( error || response.body.error )
            callback( true, undefined );
        else {

            const { weather_descriptions, temperature, feelslike } = response.body.current;

            callback( undefined, {
                location: response.body.location.name,
                weather_descriptions,
                temperature,
                feelslike
            } );
        }
    } );
};

module.exports = forecast;