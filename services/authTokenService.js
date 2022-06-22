const dbService = require('./dbService.js');

let accessCredentials = {};

const getAccessCredentials = async () => {
  console.log('Repository: getAccessCredentials');
  const dbCredentials = await dbService.connectToDb().then((db) => db.query(
    'SELECT `partners`.`name`, `partners`.`token`, `partners`.`isAdmin` FROM `partners`;'
  ));

  let accessCredentials = {};

  for(let credential in dbCredentials) {
    accessCredentials[dbCredentials[credential]['name']] = [dbCredentials[credential]['token'], dbCredentials[credential]['isAdmin']];
  }
  console.log(dbCredentials);
  console.log(accessCredentials);
  return accessCredentials;
}

getAccessCredentials().then(checkPass => {
  accessCredentials = checkPass;
});

const checkAccessToken = (req, res, next) => {
  const user =  req.headers['x-user-name'];
  const token =  req.headers['x-access-token'];

  if (!token || !user) {
    return res.status(401).send({auth: false, message: 'Credentials missing.'})
  }

  if (accessCredentials[user][0] !== token) {
    return res.send(401).send({auth: false, message: 'Invalid token provided.'})
  }

  if (accessCredentials[user][1] !== 1) {
    console.log("im not an admin");
  }


  next();
}

module.exports = checkAccessToken;