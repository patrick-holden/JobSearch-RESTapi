const jobsController = require('../controllers/jobsController');
const httpResponseService = require('../services/httpResponseService');

const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
    app.get('/jobs/query/', jobsController.getSearchAndFilterJobs);
    app.get('/jobs/:jobId', jobsController.getJob);
    app.get('/jobs/admin/:term', (req, res) => {res.send('admin')});

    app.get('*', (req, res) => {
        res.status(404).json(httpResponseService(res.statusCode, 'Invalid Request'));
    })
}

module.exports = routes;


