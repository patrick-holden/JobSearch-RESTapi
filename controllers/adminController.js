const adminService = require('../services/adminService');
const httpResponseService = require('../services/httpResponseService');

const getAllJobsData = (req, res) => {
  console.log('Controller: getJobs');
  adminService.getAllJobsData().then((allJobs) => {
    if(allJobs.length === 0) {
      res.json(httpResponseService(res.statusCode, 'No jobs found',true, allJobs))
    } else {
      res.json(httpResponseService(res.statusCode,'Success',true,  allJobs));
    }})
}

module.exports.getAllJobsData = getAllJobsData;