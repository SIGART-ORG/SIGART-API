const QuerySQL = require( '../sql/sql' );
const DB = require( '../database' );
const Routers = require( '../configs/router' );

module.exports = {
    getLastNotification( admin ) {
        return new Promise( ( resolve, reject ) => {
            DB.query(QuerySQL.admin.lastNotification, [admin], (err, results, fields) => {
                if (err) {
                    reject({
                        msg: err.message
                    });
                }

                if( results[0] ) {
                    resolve({
                        id: results[0].id,
                        message: results[0].message,
                        send: results[0].dateDelivery,
                    });
                } else {
                    reject({
                        msg: 'No hay registros.'
                    });
                }
            });
        });
    }
};