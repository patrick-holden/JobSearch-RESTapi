const adminRepository = require('../repositories/adminRepository');

const getAllJobsData = async(query) => {
  const search = query.search

  if(query.search) {
    query.search = search.replace(/[^a-z\d ]/gi, "").trim();
  }
  return await adminRepository.getAllJobsData(query);

}

const postFilledJob = async (id) => {
  return await adminRepository.postFilledJob(id);
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.postFilledJob = postFilledJob;