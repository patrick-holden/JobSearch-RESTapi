const adminRepository = require('../repositories/adminRepository');
const sanitiseAndValidateService = require("./sanitiseAndValidateService");

const getAllJobsData = async(query) => {

  if(sanitiseAndValidateService.alphaNumericSearch(query) === -1) {
    return -1;
  }
  return await adminRepository.getAllJobsData(query);

}

const markJobFilled = async (id) => {

  if(sanitiseAndValidateService.idIsNum(id) === -1) {
    return -1;
  }

  return await adminRepository.markJobFilled(id);
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.markJobFilled = markJobFilled;