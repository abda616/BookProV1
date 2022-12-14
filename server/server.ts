const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/user.json');
const middlewares = jsonServer.defaults();
const db = require('./user.json');
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/signIn', (req, res, next) => {
  const users = readUsers();
  const user = users.filter(u => u.email === req.body.email && u.password === req.body.password)[0];
  if (user) {
    res.send({...formatUser(user), token: checkIfAdmin(user)});
  } else {
    res.status(401).send('Incorrect email or password');
  }
});

server.post('/register', (req, res) => {
  const users = readUsers();
  const user = users.filter(u => u.email === req.body.email)[0];

  if (user === undefined || user === null) {
    res.send({...formatUser(req.body), token: checkIfAdmin(req.body)});
    db.users.push(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});

server.use('/users', (req, res, next) => {
  if (isAuthorized(req) || req.query.bypassAuth === 'true') {
    next();
  } else {
    res.sendStatus(401);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user) {
  delete user.password;
  user.role = user.email === 'admin' ? 'admin' : 'user';
  return user;
}

function checkIfAdmin(user, bypassToken = false) {
  return user.email === 'admin' || bypassToken === true ? 'admin-token' : 'user-token';
}

function isAuthorized(req) {
  return req.headers.authorization === 'admin-token';
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/user.json');
  return JSON.parse(dbRaw).users;
}
