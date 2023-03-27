const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    // sets username
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    // sets email
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "enter a correct emai",
      ],
    },
    // sets thoughts array connects it to user, ObjectId refrences a thought
    // double check
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    // sets friends array connects it to user, ObjectId refrences a user
    // double check
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    // sets virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// creates function counting the number of friends a user has
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// creates user model
const User = model("user", userSchema);

module.exports = User;
