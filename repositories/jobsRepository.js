const dbService = require('../services/dbService');

const getJobs = async() => {
    console.log('Repository: getJobs');
    const allJobs =  await dbService.connectToDb().then((db) => db.query(
      'SELECT `jobs`.`id`, ' +
      '`jobs`.`job_title`, ' +
      '`jobs`.`company`, ' +
      '`jobs`.`logo`,' +
      '`jobs`.`salary`,' +
      '`jobs`.`type`, ' +
      '`skills`.`skill` ' +
      'FROM `jobs` ' +
      'RIGHT JOIN ' +
      '`jobs_skills` ' +
      'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
      'LEFT JOIN `skills` ' +
      'ON `jobs_skills`.`skill_id` = `skills`.`id`' +
      'WHERE `jobs`.`id` = ' + 4 + ';'
    ));

    allJobs.forEach((job) => {
    if (job['id'] == 4) {
        console.log('hello');
    }})
    return allJobs;
}
module.exports.getJobs = getJobs;