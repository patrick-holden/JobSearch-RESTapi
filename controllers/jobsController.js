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

const getFilterJobs = (req, res) => {
    let jobSearch = req.query.search;
    let type = req.query.type;
    let salary1 = parseInt(req.query.salary1);
    let salary2 = parseInt(req.query.salary2);
    let skill = parseInt(req.query.skill);
    console.log(`Search is ${jobSearch}, type is ${type}, salary1 is ${salary1}, salary2 is ${salary2}`);
    let query = {
        jobSearch: jobSearch,
        type: type,
        salary1: salary1,
        salary2: salary2,
        skill: skill,
    }
    console.log(query);
    jobsService.getFilterJobs(query).then((query) => res.json(query));

}

module.exports.getFilterJobs = getFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
// module.exports.getSearchJobs = getSearchJobs;