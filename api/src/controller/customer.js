const QuerySQL = require( '../sql/sql' );
const DB = require( '../database' );
const Routers = require( '../configs/router' );
const moment = require( 'moment' );

module.exports = {
    errors: {},
    customerLogin: 0,
    typeEvent: '',
    setTypeEvent: function ( type ) {
        var permitEvents = [
            'sendServiceRequest'
        ];

        if( permitEvents.includes( type ) ) {
            this.typeEvent = type;
        }
    },
    getDateNow() {
        return moment().format( 'YYYY-MM-DD HH:mm:ss' );
    },
    setCustomerLogin( IdCustomerLogin ) {
        this.customerLogin = IdCustomerLogin;
    },
    sendNotification( msg ){
        return new Promise( ( resolve, reject ) => {
            if( this.customerLogin > 0 && this.typeEvent !== '' ) {
                let _customerLogin = this.customerLogin;
                let timeNow = this.getDateNow();
                this.getAllAdmins().then( function( rows ) {
                    rows.forEach( e => {
                        let idUser = e.id;
                        DB.query( QuerySQL.notification.insert, [
                            _customerLogin,
                            idUser,
                            msg,
                            Routers.admin.serviceRequest,
                            timeNow,
                            timeNow,
                            timeNow
                        ], (err, results, fields) =>{
                            if (err) {
                                return console.error( _customerLogin, err.message );
                            }
                        });
                    });
                    resolve( rows );
                });
            } else {
                this.errors.push({'msg': 'Ocurrio un error'});
                reject( this.errors );
            }
        })
    },
    getAllAdmins() {
        return new Promise( function( resolve, reject ) {
            DB.query( QuerySQL.admin.idBySites, function( err, rows, fields ) {
                if ( err ) {
                    return reject( err );
                }
                resolve( rows );
            });
        })
    },
    sendNotification_text( msg ) {
        let admins = [];
        if( this.customerLogin > 0 && this.typeEvent !== '' ) {

            DB.query( QuerySQL.admin.idBySites ).then( resolve => {
                resolve.forEach( e => {
                    let idUser = e.id;
                    DB.query( QuerySQL.notification.insert, [this.customerLogin, idUser, msg, Routers.admin.serviceRequest] ).then( response => {
                       admins.push( idUser );
                       console.log( response.insertId );
                    });
                });
            })
        }
        console.log( admins );
        return admins;
    },
};
