const mysql = require( 'mysql' );

const  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'd_pintart'
});

connection.connect( function( err ) {
    if( err ) {
        console.log( err );
        return;
    } else {
        console.log( 'Database is connected' );
    }
});

module.exports = connection;