const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const jwt = require( 'jsonwebtoken' );
const config = require( '../configs/config' );
const app = express();

let token = '';

app.set( 'llave', config.llave );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

const routersProtecteds = express.Router();
routersProtecteds.use( ( req, res, next ) => {
    const token = req.headers['access-token'];
    if ( token ) {
        jwt.verify( token, app.get( 'llave' ), ( err, decoded ) => {
            if ( err ) {
                return res.json({
                    msg: 'Token inválida.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        res.send({
            msg: 'Token no proveída.'
        });
    }
});

module.exports = {
    routersProtecteds: routersProtecteds
};