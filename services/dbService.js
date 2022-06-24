const mysql = require('promise-mysql')

const connectToDb = async() => {
  const db = await mysql.createConnection({
    user: 'root',
    password: 'password',
    database: 'jobsdb'
  })

  return db;
}

module.exports.connectToDb = connectToDb;