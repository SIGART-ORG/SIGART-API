const moment = require( 'moment' );
const dateDelivery = moment().format( 'YYYY-MM-DD hh:mm:ss' );
const dateNow = moment().format( 'YYYY-MM-DD hh:mm:ss' );

const tblNotification = 'notifications';
const tblRoles = 'roles';
const tblAdm = 'users';

const SiteDefault = 1;

const query = {
    customer: {
        all: `SELECT * FROM ${tblNotification} WHERE status = 1 and customerTo = ? ORDER BY dateDelivery desc LIMIT 10`,
        findById: `SELECT * FROM ${tblNotification} WHERE id = ?`,
        insert: `INSERT INTO ${tblNotification} ( customerFrom , userTo, dateDelivery, message, url, direction ) values( ?, ?, '${dateDelivery}', ?, ?, 1 )`,
    },
    admin: {
        all: `SELECT * FROM ${tblNotification} WHERE status = 1 and customerTo = 0 and userTo = ? ORDER BY dateDelivery desc LIMIT 10`,
        idBySites: `SELECT users.id FROM users INNER JOIN user_sites ON user_sites.users_id = users.id WHERE users.status = 1 and user_sites.sites_id = ${SiteDefault} and user_sites.roles_id not in (3, 5, 6);`,
        lastNotification: `SELECT id, message, dateDelivery  FROM ${tblNotification} WHERE userTo = ? AND status NOT IN ( 0, 2 ) ORDER BY dateDelivery DESC LIMIT 1`,
    },
    roles: {
        all: `SELECT * FROM ${tblRoles} WHERE status = 1`
    },
    notification: {
        insert: `INSERT INTO ${tblNotification} ( customerFrom, userTo, dateDelivery, message, url, direction, status, created_at, updated_at) VALUES ( ?, ?, '${dateNow}', ?, ?, 1, 1, '${dateNow}', '${dateNow}' )`
    }
};

module.exports = query;