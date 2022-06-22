const dbService = require('../services/dbService');

const getAllJobsData = async (query) => {
    console.log('Repository: getAllJobsData');
    let search = query.search;
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

    console.log('job search -' + search)

    if (search) {
        searchTerms = search.split(" ")
    } else {
        searchTerms = '';
    }

    let sqlUnfilled = 'SELECT `jobs`.`id`, ' +
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
        sqlUnfilled += ' WHERE (';

        if (searchTerms.length > 0) {
            searchTerms.forEach((term) => {
                sqlUnfilled += 'OR `jobs`.`job_description` LIKE ? OR `jobs`.`job_title` LIKE ?';
                term = '%' + term + '%';
                searchParams.push(term);
                searchParams.push(term);
            })
        }

        sqlUnfilled += ')';

        if (!isNaN(skill)) {
            sqlUnfilled += " AND `jobs_skills`.`skill_id` = '" + skill + "'";
        }

        if (type !== undefined) {
            sqlUnfilled += " AND `jobs`.`type` = '" + type + "'";
        }

        if (!isNaN(salary)) {
            sqlUnfilled += " AND `jobs`.`salary` " + order + " '" + salary + "'";
        }
    }

    sqlUnfilled = sqlUnfilled.replace('WHERE (OR', 'WHERE (');
    sqlUnfilled = sqlUnfilled.replace('WHERE () AND', 'WHERE');

    sqlUnfilled += ';';


    const allUnfilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sqlUnfilled, searchParams));

    let unfilledJobs = [];
    let previousUnfilledId = -1;
    allUnfilledFilterRecords.forEach((record) => {
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

    let sqlFilled = 'SELECT `filledjobs`.`id`, ' +
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
        'ON `jobs_skills`.`skill_id` = `skills`.`id`';

    if (searchTerms.length > 0 || !isNaN(skill) || type !== undefined || (!isNaN(salary))) {
        sqlFilled += ' WHERE (';

        if (searchTerms.length > 0) {
            searchTerms.forEach((term) => {
                sqlFilled += 'OR `filledjobs`.`job_description` LIKE ? OR `filledjobs`.`job_title` LIKE ?';
                term = '%' + term + '%';
                searchParams.push(term);
                searchParams.push(term);
            })
        }

        sqlFilled += ')';

        if (!isNaN(skill)) {
            sqlFilled += " AND `jobs_skills`.`skill_id` = '" + skill + "'";
        }

        if (type !== undefined) {
            sqlFilled += " AND `filledjobs`.`type` = '" + type + "'";
        }

        if (!isNaN(salary)) {
            sqlFilled += " AND `filledjobs`.`salary` " + order + " '" + salary + "'";
        }
    }

    sqlFilled = sqlFilled.replace('WHERE (OR', 'WHERE (');
    sqlFilled = sqlFilled.replace('WHERE () AND', 'WHERE');

    sqlFilled += ';';


    const allFilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sqlFilled, searchParams));

    let filledJobs = [];
    let previousFilledId = -1;
    allFilledFilterRecords.forEach((record) => {
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

    let allJobs = {
        "filled job count": filledCount,
        "filled jobs": filledJobs,
        "unfilled job count": unfilledCount,
        "unfilled jobs": unfilledJobs
    };
    // console.log(allJobs);
    return allJobs;
}

module.exports.getAllJobsData = getAllJobsData;