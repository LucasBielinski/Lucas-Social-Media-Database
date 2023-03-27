const { Schema, model, Types } = require("mongoose");
// creates reaction schema
const reactionSchema = new Schema(
  {
    // creates _id to reactionId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // sets rule for reaction body
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    // sets rule for username
    username: {
      type: String,
      required: true,
    },
    // sets createdAt
    // gets date sets it to current, if there is a date returns a formated version of the date concating each part of the date with "/"
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date)
          return (
            date.getMonth() +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear().toString().substr(-2)
          );
      },
    },
  },
  {
    // allows getters
    toJSON: {
      getters: true,
    },
    // please explain
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    // sets rules for text
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    // sets createdAt
    // gets date sets it to current, if there is a date returns a formated version of the date concating each part of the date with "/"
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date)
          return (
            date.getMonth() +
            "/" +
            date.getDate() +
            "/" +
            date.getFullYear().toString().substr(-2)
          );
      },
    },
    // sets username
    username: {
      type: String,
      required: true,
    },
    // Links reactionSchema
    reactions: [reactionSchema],
  },

  {
    // sets getters and virtuals
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
// counts the length of ractions in a schema
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
// creates thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
