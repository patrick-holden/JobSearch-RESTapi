const jobsService = require('../services/jobService');

const getJob = (req, res) => {
    let jobId = parseInt(req.params.jobId);
    console.log('Controller: getProduct');
    jobsService.getJob(jobId).then((job) => res.json(job));
}

module.exports.getJob = getJob;