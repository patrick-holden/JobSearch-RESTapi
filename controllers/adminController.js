const adminService = require('../services/adminService');
const httpResponseService = require('../services/httpResponseService');

const getAllJobsData = (req, res) => {
  console.log('Admin controller: getJobs');
  let search = req.query.search;
  let type = req.query.type;
  let command = req.query.command;
  let salary = parseInt(req.query.salary);
  let skill = parseInt(req.query.skill);

  let query = {
    search: search,
    type: type,
    command: command,
    salary: salary,
    skill: skill,
  }

  adminService.getAllJobsData(query, req, res).then((allJobs) => {
    if(allJobs.length === 0) {
      res.json(httpResponseService(res.statusCode, 'No jobs found',true, allJobs))
    } else {
      res.json(httpResponseService(res.statusCode,'Success',true,  allJobs));
    }})

}

module.exports.getAllJobsData = getAllJobsData;
// module.exports.getSearchFilterAdminJobs = getSearchFilterAdminJobs;