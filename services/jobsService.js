const jobsRepository = require('../repositories/jobsRepository');

const getJobs = async() => {
    console.log('Service: getJobs');
    return await jobsRepository.getJobs();
}

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

// const getSearchJobs = async (jobSearch) => {
//     console.log('Service: getSearchJobs ' + jobSearch);
//     return await jobsRepository.getSearchJobs(jobSearch);
// }

const getSearchAndFilterJobs = async (query) => {
    console.log('Service: getSearchAndFilterJobs ' + query);
    return await jobsRepository.getSearchAndFilterJobs(query);
}

module.exports.getSearchAndFilterJobs = getSearchAndFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
// module.exports.getSearchJobs = getSearchJobs;