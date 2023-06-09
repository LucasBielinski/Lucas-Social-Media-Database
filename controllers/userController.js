const { User, Thought } = require("../models");

module.exports = {
  // gets all users
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
  // gets single users
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__V")
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // updates user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user by this ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // deletes user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "no user found" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "user and associated thoughts deleted" }))
      .catch((err) => res.status(500).json(err));
  },
  // adds friends
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(400).json({ message: "no user with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // removes friends
  byeFriend(req, res) {
    console.log(req.params.userId, req.params.friendId);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      // { $pull: { friends: { friendId: { $eq: req.params.friendId } } } }
      { $pull: { friends: req.params.friendId } }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
