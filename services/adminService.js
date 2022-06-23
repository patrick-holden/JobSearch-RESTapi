const adminRepository = require('../repositories/adminRepository');

const getAllJobsData = async(query) => {
  const search = query.search

  if(query.search) {
    query.search = search.replace(/[^a-z\d ]/gi, "").trim();
  }
  return await adminRepository.getAllJobsData(query);

}

const markJobFilled = async (id) => {
  return await adminRepository.markJobFilled(id);
}

module.exports.getAllJobsData = getAllJobsData;
module.exports.markJobFilled = markJobFilled;