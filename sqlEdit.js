

const sqlEdit = (table, query) => {

    let search = query.search;
    let type = query.type;
    let command = query.command;
    let salary = query.salary;
    let skill = query.skill;
    console.log('SQL EDIT ' + type + command + salary);

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
            sql += " AND `jobs`.`type` = '" + type +  "'";
        }

        if (!isNaN(salary)) {
            sql += " AND `jobs`.`salary` " + order + " '" +  salary + "'";
        }
    }

    sql = sql.replace('WHERE (OR', 'WHERE (');
    sql = sql.replace('WHERE () AND', 'WHERE');

    sql += ';';

    console.log(searchParams);
    console.log(sql);
    return {
        sql,
        searchParams
    };
}

module.exports = sqlEdit;