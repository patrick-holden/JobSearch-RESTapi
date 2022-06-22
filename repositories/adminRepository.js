const dbService = require('../services/dbService');

const getAllJobsData = async () => {
  console.log('Repository: getAllJobsData');
  const allRecords = await dbService.connectToDb().then((db) => db.query(
    'SELECT `jobs`.`id` ' +
    // '`jobs`.`job_title`, ' +
    // '`jobs`.`company`, ' +
    // '`jobs`.`logo`,' +
    // '`jobs`.`salary`,' +
    // '`jobs`.`type`, ' +
    // '`skills`.`skill` ' +
    'FROM `jobs`;'
    // 'LEFT JOIN ' +
    // '`jobs_skills` ' +
    // 'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
    // 'LEFT JOIN `skills` ' +
    // 'ON `jobs_skills`.`skill_id` = `skills`.`id`;'
  ));

  let allJobs = [];
  let previousId = -1;
  allRecords.forEach((record) => {
    let lastJob = allJobs[allJobs.length - 1];
    if (record['id'] !== previousId) {
      previousId = record['id'];
      record['skill'] = [record['skill']];
      allJobs.push(record);
    } else {
      lastJob['skill'].push(record['skill']);
    }
  })

  return allJobs;
}

const getJobData = async (id) => {
  console.log('Repository: getJob ' + id);
  const allIdRecords = await dbService.connectToDb().then((db) => db.query(
      'SELECT ' +
      '`jobs`.`id`, ' +
      '`jobs`.`job_title`, ' +
      '`jobs`.`company`, ' +
      '`jobs`.`logo`,' +
      '`jobs`.`job_description`, ' +
      '`jobs`.`salary`,' +
      '`jobs`.`posted`,' +
      '`jobs`.`type`, ' +
      '`skills`.`skill` ' +
      ' FROM `jobs` ' +
      'LEFT JOIN ' +
      '`jobs_skills` ' +
      'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
      'LEFT JOIN `skills` ' +
      'ON `jobs_skills`.`skill_id` = `skills`.`id` ' +
      'WHERE `jobs`.`id` = ' + id + ';'));

  let allJobData = [];
  let previousId = -1;
  allIdRecords.forEach((record) => {
    let lastJob = allJobData[allJobData.length - 1];
    if (record['job_id'] !== previousId) {
      previousId = record['job_id'];
      record['skill'] = [record['skill']];
      allJobData.push(record);
    } else {
      lastJob['skill'].push(record['skill']);
    }
  })

  return allJobData;
}

const postFilledJob = async (id) => {

  await dbService.connectToDb().then((db) => db.query(
      'INSERT INTO `filledjobs` ' +
      'SELECT * FROM `jobs` ' +
      'WHERE `jobs`.`id` = ' + id + ';'));

  // (err,result) => {
  //   if(err) {
  //     throw err;
  //   }
  //   console.log(result)
  //   console.log(result.insertId)
  //   return result.insertId;

  await dbService.connectToDb().then((db) => db.query(
      'DELETE FROM `jobs` ' +
      'WHERE `jobs`.`id` = ' + id + ';'));

  return 1;
}




module.exports.getAllJobsData = getAllJobsData;
module.exports.getJobData = getJobData;
module.exports.postFilledJob = postFilledJob;