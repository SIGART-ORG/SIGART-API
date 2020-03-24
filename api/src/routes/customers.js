const express = require( 'express' );
const router = express.Router();
const database = require( '../database' );
const SQLQuery = require( '../sql/sql' );
const father = require( './father' );

const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../configs/config' );
const app = express();

let token = '';

app.set( 'llave', config.llave );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

router.get( '/autenticar', ( req, res ) => {
    console.log( 'dddd' );
    if( req.query.user === 'julio' && req.query.password === '123456' ) {
        const payload = {
            check: true
        };

        token = jwt.sign( payload, app.get( 'llave' ), {
            expiresIn: 1440
        });

        res.json({
            msg: 'Autenticación correcta',
            token: token
        })
    }
});

const path = '/customer/notification/';

router.get( '/', ( req, res ) => {
     res.json( 'Bienvenido al api.' );
});

router.get( path, father.routersProtecteds, ( req, res ) => {
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