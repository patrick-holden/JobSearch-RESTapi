const adminRepository = require('../repositories/adminRepository');
const httpResponseService = require('../services/httpResponseService');

const getAllJobsData = async() => {
  console.log('Service: getAllJobsData');
  return await adminRepository.getAllJobsData();
}

module.exports.getAllJobsData = getAllJobsData;