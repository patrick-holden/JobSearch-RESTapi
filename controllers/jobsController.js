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

const getSearchJobs = (req, res) => {
    let jobSearch = req.params.key;
    console.log(jobSearch);
    console.log('Controller: getSearchJobs');
    jobsService.getSearchJobs(jobSearch).then((searchedJobs) => res.json(searchedJobs));
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
module.exports.getSearchJobs = getSearchJobs;