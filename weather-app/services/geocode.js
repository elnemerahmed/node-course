const request = require( 'postman-request' );

const geocode = ( address, callback ) => {
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent( address ) + '.json?access_token=pk.eyJ1Ijoic3R1ZGVudG5lbWVyIiwiYSI6ImNrbzRhZzZ0NDEwMmwydnM1eDRlNXp3c2sifQ.mp96lKs90SjeynN-NuA8dQ';
    request( {
        url,
        json: true
    }, ( error, response ) => {
        if ( error || response.body.features.length === 0 )
            callback( true, undefined );
        else {

            const body = response.body.features[ 0 ];

            callback( undefined, {
                latitude: body.center[ 1 ],
                longitude: body.center[ 0 ],
                location: body.place_name
            } );
        }
    } );
};

module.exports = geocode;