const dbService = require('../services/dbService');

const getJobs = async() => {
    console.log('Repository: getJobs');
    const allRecords =  await dbService.connectToDb().then((db) => db.query(
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
    let allJobs = [];
    let previousId = -1;
    allRecords.forEach((record) => {
        let lastJob = allJobs[allJobs.length-1];
        // console.log(lastJob);
        if (record['id'] !== previousId) {
            previousId = record['id'];
            record['skill'] = [record['skill']];
            allJobs.push(record);
        } else {
            lastJob['skill'].push(record['skill']);
            console.log(lastJob);
            console.log(record['skill']);

    }})
    console.log(allJobs);
    // console.log(jobSkills);
    return allJobs;
}
module.exports.getJobs = getJobs;