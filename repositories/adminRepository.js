const dbService = require('../services/dbService');
const {sqlEdit} = require('./helperRepository');
const {sortDuplicateJobs} = require("./helperRepository");

const getAllJobsData = async (query) => {
    console.log('Admin Repository: getAllJobsData');

    let {sql, searchParams} = sqlEdit('jobs', query);

    const allUnfilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));

    let unfilledJobs = sortDuplicateJobs(allUnfilledFilterRecords);

    let unfilledCount = unfilledJobs.length;
    console.log(unfilledCount);

    let sqlEditObj = sqlEdit('filledjobs', query);
    sql = sqlEditObj.sql;
    searchParams = sqlEditObj.searchParams;

    const allFilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));

    let filledJobs = sortDuplicateJobs(allFilledFilterRecords);

    let filledCount = filledJobs.length;
    console.log(filledCount);

    let allJobs = {
        "filled job count": filledCount,
        "filled jobs": filledJobs,
        "unfilled job count": unfilledCount,
        "unfilled jobs": unfilledJobs
    };
    return allJobs;
}

module.exports.getAllJobsData = getAllJobsData;