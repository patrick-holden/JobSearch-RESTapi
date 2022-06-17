const dbService = require('../services/dbService');

let jobsCollection = null;
dbService.connectToDb().then((db) => jobsCollection = db.collection('jobs'));

const getJob = async (id) => {
    console.log('Repository: getJob ' + id);
    return await jobsCollection.query('SELECT * FROM jobs WHERE ID = ' + req.params.id + ';');
}

module.exports.getJob = getJob;