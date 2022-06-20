const jobsController = require('../controllers/jobsController');

const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
    app.get('/jobs/:jobId', jobsController.getJob);
    app.get('/jobs/search/:term', jobsController.getSearchJobs);
    app.get('/jobs/admin/:term', (req, res) => {res.send('admin')});
    app.get('*', (req, res) => {res.send('unknown')});
}

module.exports = routes;