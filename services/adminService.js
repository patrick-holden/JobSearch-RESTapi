const adminRepository = require('../repositories/adminRepository');
const sanitiseAndValidateService = require("./sanitiseAndValidateService");

const getJobs = async(query) => {

  if(sanitiseAndValidateService.alphaNumericSearch(query) === -1) {
    return -1;
  }

  return await adminRepository.getJobs(query);
}

const markJobFilled = async (id) => {

  if(sanitiseAndValidateService.idIsNum(id) === -1) {
    return -1;
  }

  return await adminRepository.markJobFilled(id);
}

module.exports.getJobs = getJobs;
module.exports.markJobFilled = markJobFilled;