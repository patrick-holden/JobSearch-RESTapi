const jobsController = require('../controllers/jobsController');

const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
    app.get('/jobs/:jobId', jobsController.getJob);
    app.get('/search/:key', jobsController.getSearchJobs);
}

module.exports = routes;