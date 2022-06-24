const dbService = require('../services/dbService');
const {sqlEdit} = require('./helperRepository');
const {sortDuplicateJobs} = require("./helperRepository");

const getJobs = async (query) => {
    let {sql, searchParams} = sqlEdit('jobs', query);

    const allUnfilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));
    let unfilledJobs = sortDuplicateJobs(allUnfilledFilterRecords);
    let unfilledCount = unfilledJobs.length;

    let sqlEditObj = sqlEdit('filledjobs', query);
    sql = sqlEditObj.sql;
    searchParams = sqlEditObj.searchParams;

    const allFilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));
    let filledJobs = sortDuplicateJobs(allFilledFilterRecords);
    let filledCount = filledJobs.length;

    let allJobs = {};

    if(filledCount > 0 || unfilledCount > 0) {
        allJobs = {
            "filled job count": filledCount,
            "filled jobs": filledJobs,
            "unfilled job count": unfilledCount,
            "unfilled jobs": unfilledJobs
        }
    }

    return allJobs;
}

const markJobFilled = async (id) => {
    const insertJob = await dbService.connectToDb().then((db) => db.query(
        'INSERT INTO `filledjobs` ' +
        'SELECT * FROM `jobs` ' +
        'WHERE `jobs`.`id` = ?;', id));

    let insertId = insertJob.insertId;

    await dbService.connectToDb().then((db) => db.query(
        'DELETE FROM `jobs` ' +
        'WHERE `jobs`.`id` = ?;', id));

    return insertId;
}

module.exports.getJobs = getJobs;
module.exports.markJobFilled = markJobFilled;