const dbService = require('../services/dbService');

// let jobsCollection = null;
// dbService.connectToDb().then((db) => db);

const getJobs = async() => {
    console.log('Repository: getJobs');
    return await dbService.connectToDb().then((db) => db.query('SELECT * FROM jobs;'));
}

module.exports.getJobs = getJobs;