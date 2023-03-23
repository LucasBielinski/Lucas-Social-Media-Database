const { User, Thought } = require("../models");

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  // create a new post
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          // unsure
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "thought created, but may not be associated with user",
            })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__V")
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thoughts" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user by this ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no user found" })
          : res.json({ message: "user and associated thoughts deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } }
      // run validators?
    )
      .then((thought) =>
        !thought
          ? res.status(400).json({ message: "no user with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeReact(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
      // run validators?
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
