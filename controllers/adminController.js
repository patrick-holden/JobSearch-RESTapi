const adminService = require('../services/adminService');
const httpResponseService = require('../services/httpResponseService');
const jobsService = require("../services/jobsService");

const getAllJobsData = (req, res) => {
  console.log('Controller: getJobs');
  adminService.getAllJobsData().then((allJobs) => {
    if(allJobs.length === 0) {
      res.json(httpResponseService(res.statusCode, 'No jobs found',true, allJobs))
    } else {
      res.json(httpResponseService(res.statusCode,'Success',true,  allJobs));
    }})
}

const getJobData = (req, res) => {
  let jobId = parseInt(req.params.jobId);
  console.log(jobId);
  console.log('Admin Controller: getJob');
  adminService.getJobData(jobId).then((job) => {
    if (job.length === 0) {
      res.json(httpResponseService(res.statusCode,'No job found',true, job))
    } else {
      res.json(httpResponseService(res.statusCode,'success',true, job))
    }
  });

}

const postFilledJob = (req, res) => {
  let jobId = parseInt(req.params.jobId);
  console.log(jobId)
  adminService.postFilledJob(jobId).then((id) => {
    console.log(id)
    let lastid = parseInt(id)
    if (lastid !== jobId) {
      res.json(httpResponseService(res.statusCode,'unsuccessful',true, ))
    } else {
      res.json(httpResponseService(res.statusCode,'success',true,))
    }
  });
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.getJobData = getJobData;
module.exports.postFilledJob = postFilledJob;