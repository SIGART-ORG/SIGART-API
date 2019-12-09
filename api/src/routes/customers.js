const express = require( 'express' );
const router = express.Router();
const database = require( '../database' );
const SQLQuery = require( '../sql/sql' );

const path = '/customer/notification/';

router.get( '/', ( req, res ) => {
     res.json( 'Bienvenido al api.' );
});

router.get( path, ( req, res ) => {
    database.query( SQLQuery.customer.all, [1], ( err, rows, fields ) => {
        if( !err ) {
            res.json( rows );
        } else {
            console.log( err );
        }
    });
});

router.get( path + ':id', ( req, res ) => {
    const { id } = req.params;
    database.query( SQLQuery.customer.findById, [id], ( err, rows, fields ) => {
        if( !err ) {
            res.json( rows[0] );
        } else {
            console.log( err );
        }
    });
});

router.post( path, ( req, res ) => {
    const { customer, user, message, url } = req.body;

    console.log( '\n------\n', 'INSERT NOTIFICATIONS\n', '------' );

    database.query( SQLQuery.customer.insert, [
        customer, user, message, url
    ], ( err, rows, fields ) => {
        if( !err ) {
            res.json({ code: 200, status: 'Notifications saved'});
        } else {
            res.json( err );
            console.log( err );
        }
    });
});

module.exports = router;