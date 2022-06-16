const mysql = require('promise-mysql')

const connectToDb = async(req, res) => {
  const db = await mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'jobs'
  })
  return db;
}

module.exports = connectToDb;