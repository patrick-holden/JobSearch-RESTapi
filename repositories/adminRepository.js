const dbService = require('../services/dbService');
const sqlEdit = require('../sqlEdit');

const getAllJobsData = async (query) => {
    console.log('Repository: getAllJobsData');
    console.log(__dirname);

    let {sql, searchParams} = sqlEdit('jobs', query);

    const allUnfilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));

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

    let sqlEditObj = sqlEdit('filledjobs', query);
    sql = sqlEditObj.sql;
    searchParams = sqlEditObj.searchParams;

    const allFilledFilterRecords = await dbService.connectToDb().then((db) => db.query(
        sql, searchParams));

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