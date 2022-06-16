const dbService = require('../services/dbService');

let jobsCollection = null;
dbService.connectToDb().then((db) => jobsCollection = db.collection('jobs'));

const getJobs = async() => {
    console.log('Repository: getPigs');
    return await jobsCollection.query('SELECT * FROM jobs;')
}

module.exports.getJobs = getJobs;