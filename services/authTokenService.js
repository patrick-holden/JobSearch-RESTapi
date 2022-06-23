const dbService = require('./dbService.js');

let accessCredentials = {};

const getAccessCredentials = async () => {
  const dbCredentials = await dbService.connectToDb().then((db) => db.query(
    'SELECT `partners`.`name`, `partners`.`token`, `partners`.`isAdmin` FROM `partners`;'
  )).catch((err) => console.log('Fred' + err));
  console.log(dbCredentials);

  let accessCredentials = {};

  for(let credential in dbCredentials) {
    accessCredentials[dbCredentials[credential]['name']] = [dbCredentials[credential]['token'], dbCredentials[credential]['isAdmin']];
  }
  console.log(accessCredentials);
  return accessCredentials;
}

const tokenCheck = (req, res) => {
  const user =  req.headers['x-user-name'];
  const token =  req.headers['x-access-token'];

  if (!token || !user) {
    return res.status(401).send({auth: false, message: 'Please complete all login fields.'})
  }

  if (!accessCredentials[user] || !accessCredentials[user][0]) {
    return res.status(401).send({auth: false, message: 'Access Denied.'})
  }

  if (accessCredentials[user][0] !== token) {
    return res.status(401).send({auth: false, message: 'Access Denied.'})
  }
}

getAccessCredentials().then(checkPass => {
  accessCredentials = checkPass;
});

const checkPartnerToken = (req, res, next) => {
  tokenCheck(req, res);

  next();
}

const checkAdminToken = (req, res, next) => {
  tokenCheck(req, res);

  const user =  req.headers['x-user-name'];

  if (accessCredentials[user][1] !== 1) {
    return res.status(401).send({auth: false, message: 'Access Denied.'})
  }

  next();
}

module.exports.checkPartnerToken = checkPartnerToken;
module.exports.checkAdminToken = checkAdminToken;