const jobsRepository = require('../repositories/jobsRepository');

const getJobs = async() => {
    console.log('Service: getJobs');
    return await jobsRepository.getJobs();
}

module.exports.getJobs = getJobs;