const jobsRepository = require('../repositories/jobsRepository');

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

module.exports.getJob = getJob;