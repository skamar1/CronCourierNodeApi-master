export default {
  database: {
    server: process.env.DATABASE_SERVER || 'courierDB.database.windows.net',
    port: 1433,
    user: process.env.DATABASE_USER || 'csAdmin',
    password: process.env.DATABASE_PASSWORD || 'vtcGMEahhJc2HeV7mcra2RVHH',
    database: process.env.DATABASE_NAME || 'courierDB',
    connectionTimeout: 30000,
    driver: 'tedious',
    stream: false,
    options: {
      appName: 'courierApi',
      trustServerCertificate: true,
      encrypt: true
    }
  }
}