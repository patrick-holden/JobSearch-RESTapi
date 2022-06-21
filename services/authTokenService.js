const dbService = require('./dbService.js');

let credentials = {};

const getAccess = async () => {
  console.log('Repository: getAccessCredentials');
  const checkPass = await dbService.connectToDb().then((db) => db.query(
    'SELECT `partners`.`name`, `partners`.`token` FROM `partners`;'
  ));

  let credentials = {};

  for(let i in checkPass) {
    credentials[checkPass[i]['name']] = checkPass[i]['token'];
  }

  return credentials;
}

getAccess().then(checkPass => {
  credentials = checkPass;
});

const tokenCheck = (req, res, next) => {
  const user =  req.headers['x-user-name'];
  const token =  req.headers['x-access-token'];

  if (!token || !user) {
    return res.status(401).send({auth: false, message: 'Credentials missing.'})
  }

  if (credentials[user] !== token) {
    return res.send(401).send({auth: false, message: 'Invalid token provided.'})
  }

  next();
}

module.exports = tokenCheck;