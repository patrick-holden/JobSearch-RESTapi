const jobsRepository = require('../repositories/jobsRepository');

const getJobs = async() => {
    console.log('Service: getJobs');
    return await jobsRepository.getJobs();
}

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

const getSearchJobs = async (jobSearch) => {
    console.log('Service: getSearchJobs ' + jobSearch);
    return await jobsRepository.getSearchJobs(jobSearch);
}

const getFilterJobs = async (query) => {
    console.log('Service: getFilterJobs ' + query);
    return await jobsRepository.getFilterJobs(query);
}

module.exports.getFilterJobs = getFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
module.exports.getSearchJobs = getSearchJobs;