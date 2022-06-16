const jobsController = require('../controllers/jobsController');

const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
}

module.exports = routes;