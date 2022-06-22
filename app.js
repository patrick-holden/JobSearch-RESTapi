const express = require('express');
const routes = require('./config/routes');
const checkAccessToken = require('./services/authTokenService');

const app = express();
const port = 3000;

app.use(express.json());
app.use(checkAccessToken);

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
})