const User = require('../models').User;

module.exports = app => {
  app.post('/api/createUser', (req, res) => {
    const { firstName, lastName } = req.body;
    return User.find({ where: { firstName: firstName, lastName: lastName } })
      .then(user => {
        if (user === null) {
          return User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          });
        } else {
          return Promise.reject(Error('User already exists'));
        }
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  });
};
