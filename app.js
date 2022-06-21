const express = require('express');
const routes = require('./config/routes');
const tokenCheck = require('./services/authTokenService');

const app = express();
const port = 3000;

app.use(express.json());
app.use(tokenCheck);

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
})