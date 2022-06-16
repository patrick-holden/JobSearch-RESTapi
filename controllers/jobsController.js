const jobsService = require('../services/jobsService');

const getJobs = (req, res) => {
    console.log('Controller: getJobs');
    jobsService.getJobs().then((allJobs) => res.json(allJobs));
}

module.exports.getJobs = getJobs;