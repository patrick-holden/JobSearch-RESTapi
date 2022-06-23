const jobsController = require('../controllers/jobsController');
const adminController = require('../controllers/adminController');
const authTokenService = require("../services/authTokenService");
const {checkAdminToken} = require("../services/authTokenService");
const invalidRequestController = require('../controllers/invalidRequestController');

const routes = (app) => {
    app.get('/jobs', authTokenService.checkPartnerToken, jobsController.getJobs);
    app.get('/jobs/:jobId', authTokenService.checkPartnerToken, jobsController.getJob);
    app.get('/admin/jobs', authTokenService.checkAdminToken, adminController.getJobs);
    app.post('/admin/jobs/filljob/:jobId', checkAdminToken, adminController.markJobFilled)

    app.get('*', invalidRequestController.httpInvalid);
    app.post('*', invalidRequestController.httpInvalid);
    app.put('*', invalidRequestController.httpInvalid);
    app.delete('*', invalidRequestController.httpInvalid);
}

module.exports = routes;

