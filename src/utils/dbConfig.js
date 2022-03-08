require('dotenv').config();

exports.dbconfig = { 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PW, 
    database: process.env.DB_NAME, 
    port:  process.env.DB_PORT,
    max : process.env.DB_MAX,
    idleTimeoutMillis : process.env.DB_IDLE
}

