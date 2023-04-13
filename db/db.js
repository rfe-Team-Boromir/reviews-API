const { Pool } = require('pg');
const config = require ('./db.config.js')

const pool = new Pool ({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port
})


module.exports = pool;