const jobsRepository = require('../repositories/jobsRepository');

const getJobs = async() => {
    console.log('Service: getJobs');
    return await jobsRepository.getJobs();
}

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;