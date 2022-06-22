const adminRepository = require('../repositories/adminRepository');
const httpResponseService = require('../services/httpResponseService');
const jobsRepository = require("../repositories/jobsRepository");

const getAllJobsData = async() => {
  console.log('Service: getAllJobsData');
  return await adminRepository.getAllJobsData();
}

const getJobData = async (id) => {
  console.log('Service: getJob ' + id);
  return await adminRepository.getJobData(id);
}

const postFilledJob = async (id) => {
  console.log('Service: getJob ' + id);
  return await adminRepository.postFilledJob(id);
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.getJobData = getJobData;
module.exports.postFilledJob = postFilledJob;