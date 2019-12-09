const express = require( 'express' );
const app = express();

// Settings
app.set( 'port', process.env.port || 3000 );

//middleware
app.use( express.json() );

//routes
app.use(  require( './routes/customers' ) );

//starting the server
app.listen( app.get( 'port' ), () => {
    console.log( 'Server on port', app.get( 'port' ) );
});