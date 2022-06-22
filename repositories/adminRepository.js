const dbService = require('../services/dbService');

const getAllJobsData = async () => {
  console.log('Repository: getAllJobsData');
  const allUnfilledRecords = await dbService.connectToDb().then((db) => db.query(
      'SELECT `jobs`.`id`, ' +
      '`jobs`.`job_title`, ' +
      '`jobs`.`company`, ' +
      '`jobs`.`logo`,' +
      '`jobs`.`salary`,' +
      '`jobs`.`type`, ' +
      '`skills`.`skill` ' +
      'FROM `jobs`' +
      'LEFT JOIN ' +
      '`jobs_skills` ' +
      'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
      'LEFT JOIN `skills` ' +
      'ON `jobs_skills`.`skill_id` = `skills`.`id`;'
  ));

  let unfilledJobs = [];
  let previousUnfilledId = -1;
  allUnfilledRecords.forEach((record) => {
    let lastUnfilledJob = unfilledJobs[unfilledJobs.length - 1];
    if (record['id'] !== previousUnfilledId) {
      previousUnfilledId = record['id'];
      record['skill'] = [record['skill']];
      unfilledJobs.push(record);
    } else {
      lastUnfilledJob['skill'].push(record['skill']);
    }
  })

  let unfilledCount = unfilledJobs.length;
  console.log(unfilledCount);

  const allFilledRecords = await dbService.connectToDb().then((db) => db.query(
      'SELECT `filledjobs`.`id`, ' +
      '`filledjobs`.`job_title`, ' +
      '`filledjobs`.`company`, ' +
      '`filledjobs`.`logo`,' +
      '`filledjobs`.`salary`,' +
      '`filledjobs`.`type`, ' +
      '`skills`.`skill` ' +
      'FROM `filledjobs`' +
      'LEFT JOIN ' +
      '`jobs_skills` ' +
      'ON `filledjobs`.`id` = `jobs_skills`.`job_id` ' +
      'LEFT JOIN `skills` ' +
      'ON `jobs_skills`.`skill_id` = `skills`.`id`;'
  ));

  let filledJobs = [];
  let previousFilledId = -1;
  allFilledRecords.forEach((record) => {
    let lastFilledJob = filledJobs[filledJobs.length - 1];
    if (record['id'] !== previousFilledId) {
      previousFilledId = record['id'];
      record['skill'] = [record['skill']];
      filledJobs.push(record);
    } else {
      lastFilledJob['skill'].push(record['skill']);
    }
  })

  let filledCount = filledJobs.length;
  console.log(filledCount);

  let allJobs = [unfilledJobs, filledJobs];
  // console.log(allJobs);
  return allJobs;
}

module.exports.getAllJobsData = getAllJobsData;