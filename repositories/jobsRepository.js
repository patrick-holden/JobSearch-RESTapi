const dbService = require('../services/dbService');
const {sqlEdit} = require("./helperRepository");
const {sortDuplicateJobs} = require("./helperRepository");

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
        'WHERE `jobs`.`id` = ?;', id));

    return sortDuplicateJobs(allIdRecords);
}

const getJobs = async (query) => {
    console.log('Repository: getJobs');

    let {sql, searchParams} = sqlEdit('jobs', query);

    const allFilterRecords = await dbService.connectToDb().then((db) => db.query(
      sql, searchParams));

    return sortDuplicateJobs(allFilterRecords);
}

module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
