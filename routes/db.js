const sql = require('mssql')
const config = {
    server: 'couriersqlserver.database.windows.net',
    authentication: {
        type: 'default',
        options: {
            userName: 'csAdmin',
            password: 'vtcGMEahhJc2HeV7mcra2RVHH',
            port: 1433
        }
    },
    options: {
        database: 'courierCronDB',
        rowCollectionOnDone: true,
        useColumnNames: false,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolPromise = pool.connect()
    .then(pool => {
        console.log('Connected to MSSQL')
        return pool
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    sql, poolPromise
}