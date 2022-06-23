const jobsService = require('../services/jobsService');
const httpResponseService = require('../services/httpResponseService');

const getJobs = (req, res) => {
    console.log('Controller: getJobs');
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
        if (query.length === 0) {
            res.json(httpResponseService(res.statusCode, 'No jobs found', true, query))
        } else {
            res.json(httpResponseService(res.statusCode, 'success', true, query))
        }
    });
}

const getJob = (req, res) => {
    let jobId = parseInt(req.params.jobId);
    console.log(jobId);
    console.log('Controller: getJob');
    jobsService.getJob(jobId).then((job) => {
        if (job.length === 0) {
            res.json(httpResponseService(res.statusCode,'No job found',true, job))
        } else {
            res.json(httpResponseService(res.statusCode,'success',true, job))
        }
    });
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
