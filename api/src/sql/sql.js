const moment = require( 'moment' );
const dateDelivery = moment().format( 'YYYY-MM-DD hh:mm:ss' );
const tblNotification = 'notifications';

const query = {
    customer: {
        all: `SELECT * FROM ${tblNotification} WHERE status = 1 and customerTo = ? ORDER BY dateDelivery desc LIMIT 10`,
        findById: `SELECT * FROM ${tblNotification} WHERE id = ?`,
        insert: `INSERT INTO ${tblNotification} ( customerFrom , userTo, dateDelivery, message, url, direction ) values( ?, ?, '${dateDelivery}', ?, ?, 1 )`,
    },
    admin: {
        all: 'SELECT * FROM ${tblNotification} WHERE status = 1 and customerTo = 0 and userTo = ? ORDER BY dateDelivery desc LIMIT 10'
    }
};

module.exports = query;