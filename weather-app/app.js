const forecast = require( './services/forecast' );
const geocode = require( './services/geocode' );

const addresses = [ 'Gaza, Palestine', 'Mariupol, Ukraine', 'Kharkiv, Ukraine' ];
addresses.forEach( ( address ) => {
    geocode( address, ( geoerror, geodata ) => {
        if ( geoerror )
            retrun;

        const { latitude, longitude } = geodata;

        forecast( latitude, longitude, ( forecasterror, forecastdata ) => {
            const { weather_descriptions, temperature, feelslike, location } = forecastdata;
            console.log( `In ${ location }, It's ${ weather_descriptions }, the temperature is ${ temperature } degree, but it feels like ${ feelslike } degree.` );
        } );
    } );
} );
