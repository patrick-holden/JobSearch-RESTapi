const express = require('express');
const routes = require('./config/routes')

const app = express();
const port = 3000;

routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
})