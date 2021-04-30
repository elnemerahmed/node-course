const path = require( 'path' );

const hbs = require( 'hbs' );
const express = require( 'express' );
const geocode = require( '../../weather-app/services/geocode' );
const forecast = require( '../../weather-app/services/forecast' );
const app = express();

// Define default page parameters
let parameters = {
    title: 'Default title',
    layout: 'layout',
    name: 'Ahmed El Nemer'
};

const partial = path.join( __dirname, '..', 'templates', 'partials' );
hbs.registerPartials( partial );

// Setup handlebars as a templating engine, and changing views location to templates folder 
const views = path.join( __dirname, '..', 'templates', 'views' );
app.set( 'view engine', 'hbs' );
app.set( 'views', views );

// Setup static files to the public folder
const public = path.join( __dirname, '..', 'public' );
app.use( express.static( public ) );

/*
    specify the layout option if you want to use a custom layout.
*/

app.get( '/', ( req, res ) => {
    res.render( 'index', {
        ...parameters,
        title: 'Weather App'
    } );
} );

app.get( '/about', ( req, res ) => {
    res.render( 'about', {
        ...parameters,
        title: 'About Developer'
    } );
} );

app.get( '/help', ( req, res ) => {
    res.render( 'help', {
        ...parameters,
        title: 'How to get help?'
    } );
} );

app.get( '/weather', ( req, res ) => {
    const { address = 'Gaza city' } = req.query;
    if ( !address ) {
        return res.send( {
            error: 'address is required'
        } );
    }

    geocode( address, ( geoerror, geodata ) => {
        if ( geoerror ) {
            return res.send( {
                error: geoerror
            } );
        }

        const { latitude, longitude } = geodata;

        forecast( latitude, longitude, ( forecasterror, forecastdata ) => {
            const { weather_descriptions, temperature, feelslike, location } = forecastdata;
            res.send( {
                weather_descriptions,
                temperature,
                feelslike,
                location
            } );
        } );
    } );


} );

app.get( '*', ( req, res ) => {
    res.render( 'error', {
        ...parameters,
        title: '404 Error',
        error: 'Sorry, page not found!'
    } );
} );

app.listen( 3000, () => {
    console.log( 'Server Started at port 3000' );
} );