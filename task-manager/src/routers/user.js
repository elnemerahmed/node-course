const express = require( 'express' );
const User = require( './../models/user' );

const router = new express.Router();

router.post( '/users', async ( req, res ) => {
    const user = await new User( req.body );
    try {
        user.save();
        res.status( 201 ).send( user );
    } catch ( error ) {
        res.status( 400 ).send( error );
    }
} );

router.get( '/users', async ( req, res ) => {
    try {
        const users = await User.find( {} );
        res.status( 200 ).send( users );
    } catch ( error ) {
        res.status( 500 ).send();
    }
} );

router.get( '/users/:id', async ( req, res ) => {
    const { id } = req.params;
    const user = await User.findById( id );
    try {
        if ( !user ) {
            return res.status( 404 ).send();
        }
        res.send( user );
    } catch ( error ) {
        res.status( 500 ).send( error );
    }
} );

router.patch( '/users/:id', async ( req, res ) => {
    const updates = Object.keys( req.body );
    const allowed = [ 'name', 'email', 'password', 'age' ];

    const isValid = updates.every( ( update ) => allowed.includes( update ) );
    if ( !isValid ) {
        return res.status( 400 ).send( { error: 'Invalid updates' } );
    }

    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate( id, req.body, { new: true, runValidators: true } );
        if ( !user ) {
            return res.status( 404 ).send();
        }
        res.send( user );
    } catch ( error ) {
        res.status( 500 ).send( error );
    }
} );

router.delete( '/users/:id', async ( req, res ) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete( id );
        if ( !user ) {
            return res.status( 404 ).send();
        }
        res.send( user );
    } catch ( error ) {
        res.status( 500 ).send();
    }
} );

module.exports = router;