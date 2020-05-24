const dotenv = require('dotenv');
dotenv.config();

const express = require( 'express' );
const app = express();
const http = require( 'http' ).createServer( app );
const io = require( 'socket.io' )( http );
const customer = require( './controller/customer' );
const admin = require( './controller/admin' );

// Settings
app.set( 'port', process.env.port || 3000 );

//middleware
app.use( express.json() );

let connectedAdmin = {};

io.on( 'connection', ( socket ) => {

    socket.admin = 0;
    socket.on( 'change_admin', ( data ) => {
        socket.admin = data.adminId;
        connectedAdmin[data.adminId] = socket;
        console.log( 'New admin user connected :', socket.admin );
    });

    socket.on( 'disconnect', function () {
        console.log( 'User disconnected.' );
    });

    socket.on( 'chat message', function( msg ) {
        io.emit( 'chat message', msg );
    });

    socket.on( 'create-notification-client', function( type, customerId, msg ) {
        customer.setCustomerLogin( customerId );
        customer.setTypeEvent( type );
        let notification = customer.sendNotification( msg ).then( data => {
            data.forEach( e => {
                if( connectedAdmin[e.id] ) {
                    admin.getLastNotification( e.id ).then( data => {
                        connectedAdmin[e.id].emit( 'read-notification-admin', data );
                    });
                }
            });
            console.log( 'Se registro correctamente las notificacione(s). :)' );
        });
    });

    function message( admin, event, data ) {
        io.sockets.to( admin ).emit( event, data );
    }
});

app.use('/', ( req, res ) => {
    res.json({
        'msg': 'Bienvenido al api. - ' + process.env.NAME_PROJECT
    });
});

http.listen( app.get( 'port' ), function() {
    console.log( 'Listening on *:' + app.get( 'port' ) );
});
