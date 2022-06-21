const dbService = require('../services/dbService');

const getJobs = async () => {
    console.log('Repository: getJobs');
    const allRecords = await dbService.connectToDb().then((db) => db.query(
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

const getSearchAndFilterJobs = async (query) => {
    let jobSearch = query.jobSearch;
    let type = query.type;
    let command = query.command;
    let salary = query.salary;
    let skill = query.skill;
    console.log('Repository: getFilterJob ' + type + command + salary);

    let order = '';
    if (command === 'above') {
        order = '>';
    } else {
        order = '<';
    }

    let searchTerms;
    let searchParams = [];

    if (jobSearch !== undefined) {
        searchTerms = jobSearch.split(" ")
        // const results = [];
        } else {
        searchTerms = '';
    }

    let sql = 'SELECT `jobs`.`id`, ' +
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
      'ON `jobs_skills`.`skill_id` = `skills`.`id`';

    if (searchTerms.length > 0 || !isNaN(skill) || type !== undefined || (!isNaN(salary))) {
        sql += ' WHERE (';
    }

    if (searchTerms.length > 0) {
        searchTerms.forEach((term) => {
            sql += 'OR `jobs`.`job_description` LIKE ? OR `jobs`.`job_title` LIKE ?';
            term = '%' + term + '%';
            searchParams.push(term);
            searchParams.push(term);
        })
    }
    sql += ')';

    if (!isNaN(skill)) {
        sql += " AND `jobs_skills`.`skill_id` = '" + skill + "'";
    }

    if (type !== undefined) {
       sql += " AND `jobs`.`type` = '" + type +  "'";
    }

    if (!isNaN(salary)) {
        sql += " AND `jobs`.`salary` " + order + " '" +  salary + "'";
    }

    console.log(sql);

    sql = sql.replace('WHERE (OR', 'WHERE (');
    sql = sql.replace('WHERE () AND', 'WHERE');

    sql += ';';

    console.log(skill);
    console.log(type);
    console.log(command);
    console.log(order);
    console.log(salary);
    console.log(sql);
    console.log(searchParams);

    const allFilterRecords = await dbService.connectToDb().then((db) => db.query(
      sql, searchParams));


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

module.exports.getSearchAndFilterJobs = getSearchAndFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;
// module.exports.getSearchJobs = getSearchJobs;