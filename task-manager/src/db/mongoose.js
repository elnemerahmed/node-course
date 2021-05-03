const mongoose = require( 'mongoose' );

const ip = '127.0.0.1';
const port = '27017';
const database = 'task-manager-api';
const connectionString = `mongodb://${ ip }:${ port }/${ database }`;

mongoose.connect( connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );

