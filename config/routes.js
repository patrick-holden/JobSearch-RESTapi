const jobsController = require('../controllers/jobsController');
const adminController = require('../controllers/adminController');
const httpResponseService = require('../services/httpResponseService');
const authTokenService = require("../services/authTokenService");


const routes = (app) => {
    app.get('/jobs', authTokenService.checkPartnerToken, jobsController.getJobs);
    app.get('/jobs/query/', authTokenService.checkPartnerToken, jobsController.getSearchAndFilterJobs);
    app.get('/jobs/:jobId', authTokenService.checkPartnerToken, jobsController.getJob);
    app.get('/admin/jobs', authTokenService.checkAdminToken, adminController.getAllJobsData);
    // app.get('/admin/jobs/query', authTokenService.checkAdminToken, adminController.getSearchFilterAdminJobs);

    app.get('*', (req, res) => {
        res.status(404).json(httpResponseService(res.statusCode, 'Invalid Request'));
    })
}

module.exports = routes;

