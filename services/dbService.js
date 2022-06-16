const mysql = require('promise-mysql')

const DbService = async(req, res) => {
  const db = await mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'jobs'
  })
  return db;
}

module.exports = DbService;