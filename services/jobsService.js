const jobsRepository = require('../repositories/jobsRepository');
const httpResponseService = require('../services/httpResponseService');

const getJobs = async (query) => {
    console.log('Service: getJobs');
    // return await jobsRepository.getJobs();
    const search = query.search

    if (query.search) {
        query.search = search.replace(/[^a-z0-9 ]/gi, "").trim();
    }

    return await jobsRepository.getJobs(query);
}

const getJob = async (id) => {
    console.log('Service: getJob ' + id);
    return await jobsRepository.getJob(id);
}

// const getSearchAndFilterJobs = async (query, req, res) => {
//     console.log('Service: getSearchAndFilterJobs ' + query);
//     const search = query.search
//
//
//     if(query.search) {
//         query.search = search.replace(/[^a-z0-9 ]/gi, "").trim();
//     }
//
//     return await jobsRepository.getSearchAndFilterJobs(query);
// }

// module.exports.getSearchAndFilterJobs = getSearchAndFilterJobs;
module.exports.getJob = getJob;
module.exports.getJobs = getJobs;