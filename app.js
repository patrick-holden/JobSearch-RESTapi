const express = require('express');
const routes = require('./config/routes');
// const checkAccessToken = require('./services/authTokenService');

const app = express();
const port = 3000;

app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
})