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
      'LEFT JOIN ' +
      '`jobs_skills` ' +
      'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
      'LEFT JOIN `skills` ' +
      'ON `jobs_skills`.`skill_id` = `skills`.`id`;'
    ));

    let allJobs = [];
    let previousId = -1;
    allRecords.forEach((record) => {
        let lastJob = allJobs[allJobs.length-1];
        if (record['id'] !== previousId) {
            previousId = record['id'];
            record['skill'] = [record['skill']];
            allJobs.push(record);
        } else {
            lastJob['skill'].push(record['skill']);
    }})

    return allJobs;

}

const getJob = async (id) => {
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
        let lastJob = allJobData[allJobData.length-1];
        if (record['job_id'] !== previousId) {
            previousId = record['job_id'];
            record['skill'] = [record['skill']];
            allJobData.push(record);
        } else {
            lastJob['skill'].push(record['skill']);
        }})

    return allJobData;
}

const getSearchJobs = async (jobSearch) => {
    console.log('Repository: getSearchJob ' + jobSearch);
    const allSearchRecords = await dbService.connectToDb().then((db) => db.query(
        'SELECT `jobs`.`id`, ' +
        '`jobs`.`job_title`, ' +
        '`jobs`.`company`, ' +
        '`jobs`.`logo`,' +
        '`jobs`.`salary`,' +
        '`jobs`.`type`, ' +
        '`skills`.`skill` ' +
        'FROM `jobs` ' +
        'LEFT JOIN ' +
        '`jobs_skills` ' +
        'ON `jobs`.`id` = `jobs_skills`.`job_id` ' +
        'LEFT JOIN `skills` ' +
        'ON `jobs_skills`.`skill_id` = `skills`.`id`' +
        'WHERE `jobs`.`job_title` LIKE "%' + jobSearch + '%";'));

    let allSearchJobs = [];
    let previousId = -1;
    allSearchRecords.forEach((record) => {
        let lastJob = allSearchJobs[allSearchJobs.length-1];
        if (record['id'] !== previousId) {
            previousId = record['id'];
            record['skill'] = [record['skill']];
            allSearchJobs.push(record);
        } else {
            lastJob['skill'].push(record['skill']);
        }})

    return allSearchJobs;
}


const getFilterJobs = async (query) => {
    let type = query.type;
    let salary1 = query.salary1;
    let salary2 = query.salary2;
    let skill = query.skill;
    console.log('Repository: getFilterJob ' + type + salary1 + salary2);
    const allFilterRecords = await dbService.connectToDb().then((db) => db.query(
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
        'WHERE `jobs_skills`.`skill_id` = ' + skill +
        ' AND `jobs`.`type` = "' + type + '"' + '' +
        ' AND `jobs`.`salary` BETWEEN "' + salary1 + '"  AND "' + salary2 + '" ;'));


    let allFilterJobs = [];
    let previousId = -1;
    allFilterRecords.forEach((record) => {
        let lastJob = allFilterJobs[allFilterJobs.length-1];
        if (record['id'] !== previousId) {
            previousId = record['id'];
            record['skill'] = [record['skill']];
            allFilterJobs.push(record);
        } else {
            lastJob['skill'].push(record['skill']);
        }})

    return allFilterJobs;
}

module.exports.getFilterJobs = getFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
module.exports.getSearchJobs = getSearchJobs;