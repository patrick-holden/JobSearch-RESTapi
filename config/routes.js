const jobsController = require('../controllers/jobsController');


const routes = (app) => {
    app.get('jobs/:jobId', jobsController.getJob);
}

module.exports = routes;