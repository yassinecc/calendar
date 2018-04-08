const User = require('../models').User;

module.exports = app => {
  app.post('/api/createUser', (req, res) => {
    return User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  });
};
