const adminRepository = require('../repositories/adminRepository');

const getAllJobsData = async(query) => {
  console.log('Admin Service: getAllJobsData');
  const search = query.search

  if(query.search) {
    query.search = search.replace(/[^a-z\d ]/gi, "").trim();
  }
  return await adminRepository.getAllJobsData(query);

}

const postFilledJob = async (id) => {
  console.log('Service: getJob ' + id);
  return await adminRepository.postFilledJob(id);
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.postFilledJob = postFilledJob;