const { User } = require("../models");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  // create a new post
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};
