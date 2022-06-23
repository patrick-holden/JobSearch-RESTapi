const helperRepository = require('../../repositories/helperRepository');
const {sqlEdit} = require("../../repositories/helperRepository");

describe('sqlEdit function', () => {
    it('given jobs table and skill filter', () => {
        const query = {
            skill: '5'
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({
            "searchParams": [],
            "sql": "SELECT `jobs`.`id`, `jobs`.`job_title`," +
                " `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`," +
                "`jobs`.`type`, `skills`.`skill` FROM `jobs` " +
                "LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` " +
                "LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` " +
                "WHERE `jobs_skills`.`skill_id` = '5';"
        })
    })
    it('given jobs table and skill filter 5', () => {
        const query = {
            search: 'junior'
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": ["%junior%", "%junior%"],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE ( `jobs`.`job_description` LIKE ? OR `jobs`.`job_title` LIKE ?);"
        })
    })
})