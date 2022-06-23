const httpResponseService = require("../services/httpResponseService");

const httpInvalid = ((req, res) => {
  return res.status(404).json(httpResponseService(res.statusCode, 'Invalid Request'));
});

module.exports.httpInvalid = httpInvalid;