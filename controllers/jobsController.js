const jobsService = require('../services/jobsService');

const getJobs = (req, res) => {
    console.log('Controller: getJobs');
    jobsService.getJobs().then((allJobs) => res.json(allJobs));
}

const getJob = (req, res) => {
    let jobId = parseInt(req.params.jobId);
    console.log(jobId);
    console.log('Controller: getProduct');
    jobsService.getJob(jobId).then((job) => res.json(job));
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;