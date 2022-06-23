const jobsRepository = require('../repositories/jobsRepository');
const sanitiseAndValidateService = require('../services/sanitiseAndValidateService')

const getJobs = async (query) => {

    if(sanitiseAndValidateService.alphaNumericSearch(query) === -1) {
        return -1;
    }

    return await jobsRepository.getJobs(query);
}

const getJob = async (id) => {

    if(sanitiseAndValidateService.idIsNum(id) === -1) {
        return -1;
    }

    return await jobsRepository.getJob(id);

}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;