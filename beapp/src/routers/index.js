const newUser = require('./user');

function route(app) {
  app.use('/user', newUser);
}
module.exports = route;
