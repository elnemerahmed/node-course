const mongodb = require( 'mongodb' );

const { MongoClient } = mongodb;

const connectionString = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

MongoClient.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true } )
    .then( ( client ) => {
        const db = client.db( database );

        db.collection( 'users' ).deleteOne( { email: 'someuser@mail.com' } )
            .then( ( result ) => {
                console.log( result );
            } ).catch( ( error ) => {
                console.log( error );
            } );

    } ).catch( ( error ) => {
        console.log( error );
    } );