const jobsController = require('../controllers/jobsController');
const adminController = require('../controllers/adminController');
const httpResponseService = require('../services/httpResponseService');
const checkPartnerToken = require("../services/authTokenService");
const checkAdminToken = require("../services/authTokenService");

const routes = (app) => {

    app.get('/jobs', checkPartnerToken, jobsController.getJobs);
    app.get('/jobs/query/', checkPartnerToken, jobsController.getSearchAndFilterJobs);
    app.get('/jobs/:jobId', checkPartnerToken, jobsController.getJob);
    app.get('/admin/jobs', checkAdminToken, adminController.getAllJobsData);


    // app.get('/jobs/admin/:term', (req, res) => {res.send('admin')});
    // app.get('*', (req, res) => {
    //     res.status(404).json(httpResponseService(res.statusCode, 'Invalid Request'));
    // })
}

module.exports = routes;

