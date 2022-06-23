const helperRepository = require('../../repositories/helperRepository');
const {sqlEdit} = require("../../repositories/helperRepository");

describe('sqlEdit function', () => {
    it('given jobs table and skill filter', () => {
        const query = {
            skill: '5'
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({
            "searchParams": [],
            "sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`," +
                "`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` " +
                "LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs_skills`.`skill_id` = '5';"
        })
    })

    it('given jobs table and skill filter with no value', () => {
        const query = {
            skill: ''
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({
            "searchParams": [],
            "sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`," +
              "`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` " +
              "LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs_skills`.`skill_id` = '';"
        })
    })

    it('given jobs table and search input junior', () => {
        const query = {
            search: 'junior'
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": ["%junior%", "%junior%"],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE ( `jobs`.`job_description` LIKE ? OR `jobs`.`job_title` LIKE ?);"
        })
    })

    it('given jobs table and search with no value', () => {
        const query = {
            search: ''
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id`;"
        })
    })

    it('given jobs table and type input 5', () => {
        const query = {
            type: '5'
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs`.`type` = '5';"
        })
    })

    it('given jobs table and type with no value', () => {
        const query = {
            type: ''
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs`.`type` = '';"
        })
    })

    it('given jobs table and salary below 100000', () => {
        const query = {
            salary: '100000',
            command: 'below',
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs`.`salary` < '100000';"
        })
    })

    it('given jobs table and salary over 100000', () => {
        const query = {
            salary: '100000',
            command: 'above',
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs`.`salary` > '100000';"
        })
    })

    it('given jobs table and salary with no value', () => {
        const query = {
            salary: '',
            command: 'above',
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id` WHERE `jobs`.`salary` > '';"
        })
    })

    it('given jobs table and incomplete salary requirements', () => {
        const query = {
            salary: '100000',
        }
        expect(sqlEdit('jobs', query)).toStrictEqual({"searchParams": [],"sql": "SELECT `jobs`.`id`, `jobs`.`job_title`, `jobs`.`company`, `jobs`.`logo`,`jobs`.`salary`,`jobs`.`type`, `skills`.`skill` FROM `jobs` LEFT JOIN `jobs_skills` ON `jobs`.`id` = `jobs_skills`.`job_id` LEFT JOIN `skills` ON `jobs_skills`.`skill_id` = `skills`.`id`;"
        })
    })


})