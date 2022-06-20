const jobsController = require('../controllers/jobsController');


const routes = (app) => {
    app.get('/jobs', jobsController.getJobs);
    // app.get('/jobs/:jobId', jobsController.getJob);
    // app.get('/jobs/search/:jobsearch', jobsController.getSearchJobs);
    app.get('/jobs/admin/:term', (req, res) => {res.send('admin')});
    app.get('/jobs/query/', jobsController.getSearchAndFilterJobs);
    app.get('*', (req, res) => {
        res.sendStatus(404);
        res.json(JSON.stringify({message: 'Invalid request'}));
    })
}


module.exports = routes;


