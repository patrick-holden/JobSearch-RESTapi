const adminRepository = require('../repositories/adminRepository');

const getAllJobsData = async(query, req, res) => {
  console.log('Admin Service: getAllJobsData');
  const search = query.search

  if(query.search) {
    query.search = search.replace(/[^a-z0-9 ]/gi, "").trim();
  }
  return await adminRepository.getAllJobsData(query);

}

module.exports.getAllJobsData = getAllJobsData;