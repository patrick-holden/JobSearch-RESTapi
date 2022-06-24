const jobsService = require('../services/jobsService');
const httpResponseService = require('../services/httpResponseService');

const getJobs = (req, res) => {
    let search = req.query.search;
    let type = req.query.type;
    let command = req.query.command;
    let salary = parseInt(req.query.salary);
    let skill = parseInt(req.query.skill);

    let query = {
        search: search,
        type: type,
        command: command,
        salary: salary,
        skill: skill,
    }

    jobsService.getJobs(query).then((query) => {
        if(query === -1) {
            res.status(404).json(httpResponseService(res.statusCode,'Invalid Search',true))
        } else if (query.length === 0) {
            res.json(httpResponseService(res.statusCode, 'No jobs found', true, query))
        } else {
            res.json(httpResponseService(res.statusCode, 'success', true, query))
        }
    });
}

const getJob = (req, res) => {
    let jobId = parseInt(req.params.jobId);
    jobsService.getJob(jobId).then((job) => {
        if(job === -1) {
            res.status(404).json(httpResponseService(res.statusCode,'TypeError in Id',true))
        } else if (job.length === 0) {
            res.json(httpResponseService(res.statusCode,'No job found',true, job))
        } else {
            res.json(httpResponseService(res.statusCode,'success',true, job))
        }
    });
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
