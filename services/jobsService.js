const jobsRepository = require('../repositories/jobsRepository');
// const httpResponseService = require('../services/httpResponseService');

const getJobs = async (query) => {
    console.log('Service: getJobs');
    const search = query.search

    if (query.search) {
        query.search = search.replace(/[^a-z0-9 ]/gi, "").trim();
    }

    return await jobsRepository.getJobs(query);
}

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;