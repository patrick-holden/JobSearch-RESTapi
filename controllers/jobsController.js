const jobsService = require('../services/jobsService');

const getJobs = (req, res) => {
    console.log('Controller: getJobs');
    jobsService.getJobs().then((allJobs) => res.json(allJobs));
}

const getJob = (req, res) => {
    let jobId = parseInt(req.params.jobId);
    console.log(jobId);
    console.log('Controller: getJob');
    jobsService.getJob(jobId).then((job) => {
        if (job.length === 0) {
            res.json(JSON.stringify({message: 'No such job'}))
        } else {
            res.json(job)
        }
    });
}

// const getSearchJobs = (req, res) => {
//
//     console.log(jobSearch);
//     console.log('Controller: getSearchJobs');
//     jobsService.getSearchJobs(jobSearch).then((searchedJobs) => res.json(searchedJobs));
// }

const getSearchAndFilterJobs = (req, res) => {
    let jobSearch = req.query.search;
    let type = req.query.type;
    let command = req.query.command;
    let salary = parseInt(req.query.salary);
    let skill = parseInt(req.query.skill);
    console.log(`Search is ${jobSearch}, type is ${type}, command is ${command}, salary is ${salary}`);
    let query = {
        jobSearch: jobSearch,
        type: type,
        command: command,
        salary: salary,
        skill: skill,
    }
    console.log(query);
    jobsService.getSearchAndFilterJobs(query).then((query) => res.json(query));

}

module.exports.getSearchAndFilterJobs = getSearchAndFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
// module.exports.getSearchJobs = getSearchJobs;