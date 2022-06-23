
const sqlEdit = (table, query) => {

    let search = query.search;
    let type = query.type;
    let command = query.command;
    let salary = query.salary;
    let skill = query.skill;

    let order = '';
    if (command === 'above') {
        order = '>';
    } else if (command === 'below') {
        order = '<';
    }

    let searchTerms;
    let searchParams = [];

    if (search) {
        searchTerms = search.split(" ")
    } else {
        searchTerms = '';
    }

    let sql = 'SELECT `' + table + '`.`id`, ' +
        '`' + table + '`.`job_title`, ' +
        '`' + table + '`.`company`, ' +
        '`' + table + '`.`logo`,' +
        '`' + table + '`.`salary`,' +
        '`' + table + '`.`type`, ' +
        '`skills`.`skill` ' +
        'FROM `' + table + '` ' +
        'LEFT JOIN ' +
        '`jobs_skills` ' +
        'ON `' + table + '`.`id` = `jobs_skills`.`job_id` ' +
        'LEFT JOIN `skills` ' +
        'ON `jobs_skills`.`skill_id` = `skills`.`id`';

    if (searchTerms.length > 0 || !isNaN(skill) || type !== undefined || (!isNaN(salary))) {
        sql += ' WHERE (';

        if (searchTerms.length > 0) {
            searchTerms.forEach((term) => {
                sql += 'OR `' + table + '`.`job_description` LIKE ? OR `' + table + '`.`job_title` LIKE ?';
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
            sql += " AND `" + table + "`.`type` = '" + type +  "'";
        }

        if (!isNaN(salary)) {
            sql += " AND `" + table + "`.`salary` " + order + " '" +  salary + "'";
        }
    }

    sql = sql.replace('WHERE (OR', 'WHERE (');
    sql = sql.replace('WHERE () AND', 'WHERE');

    sql += ';';

    return {
        sql,
        searchParams
    };
}

const sortDuplicateJobs = (allRecords) => {

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

module.exports.sortDuplicateJobs = sortDuplicateJobs;
module.exports.sqlEdit = sqlEdit;