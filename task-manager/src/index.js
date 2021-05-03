const express = require( 'express' );

const userRouter = require( './routers/user' );
const taskRouter = require( './routers/task' );

/*
    Connect to MongoDB Server
*/
require( './db/mongoose' );

const port = process.env.PORT || 3000;
const app = express();

/*
    Parse Request Body to JSON Object
*/
app.use( express.json() );

/*
    Registering Routes
*/
app.use( userRouter );
app.use( taskRouter );

app.listen( port, () => {
    console.log( `Server listening at port: ${ port }` );
} );

