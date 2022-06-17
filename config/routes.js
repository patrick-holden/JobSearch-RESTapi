const jobsController = require('../controllers/jobsController');

const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
    app.get('/jobs/:jobid', jobsController.getJob);
}

module.exports = routes;