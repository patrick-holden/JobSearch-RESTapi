const adminService = require('../services/adminService');
const httpResponseService = require('../services/httpResponseService');

const getJobs = (req, res) => {
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

  adminService.getJobs(query, req, res).then((allJobs) => {
    if(allJobs === -1) {
      res.status(404).json(httpResponseService(res.statusCode,'Invalid Search',true))
    } else if(Object.keys(allJobs).length === 0) {
      res.json(httpResponseService(res.statusCode, 'No jobs found',true, allJobs))
    } else {
      res.json(httpResponseService(res.statusCode,'Success',true,  allJobs));
    }})
}

const markJobFilled = (req, res) => {
  let jobId = parseInt(req.params.jobId);
  adminService.markJobFilled(jobId).then((id) => {
    let lastId = parseInt(id)

    if(lastId === -1) {
      res.status(404).json(httpResponseService(res.statusCode,'TypeError in Id',true))
    } else if (lastId !== jobId) {
      res.json(httpResponseService(res.statusCode,'unsuccessful',true, ))
    } else {
      res.json(httpResponseService(res.statusCode,'success',true,))
    }
  });
}

module.exports.getJobs = getJobs;
module.exports.markJobFilled = markJobFilled;