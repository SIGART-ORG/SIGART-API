const mysql = require( 'mysql' );

const  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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

// class Database {
//     constructor( config ) {
//         this.connection = mysql.createConnection( config );
//     }
//     query( sql, args ) {
//         return new Promise( ( resolve, reject ) => {
//             this.connection.query( sql, args, ( err, rows ) => {
//                 if ( err )
//                     return reject( err );
//                 resolve( rows );
//             } );
//         } );
//     }
//     close() {
//         return new Promise( ( resolve, reject ) => {
//             this.connection.end( err => {
//                 if ( err )
//                     return reject( err );
//                 resolve();
//             } );
//         } );
//     }
// }
//
// const connection = new Database({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'd_pintart'
// });

// module.exports = connection;
