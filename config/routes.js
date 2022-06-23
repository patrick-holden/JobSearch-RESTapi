const jobsController = require('../controllers/jobsController');
const adminController = require('../controllers/adminController');
const httpResponseService = require('../services/httpResponseService');
const authTokenService = require("../services/authTokenService");


const routes = (app) => {
    app.get('/jobs', authTokenService.checkPartnerToken, jobsController.getJobs);
    app.get('/jobs/:jobId', authTokenService.checkPartnerToken, jobsController.getJob);
    app.get('/admin/jobs', authTokenService.checkAdminToken, adminController.getAllJobsData);

    app.get('*', (req, res) => {
        res.status(404).json(httpResponseService(res.statusCode, 'Invalid Request'));
    })
}

module.exports = routes;

