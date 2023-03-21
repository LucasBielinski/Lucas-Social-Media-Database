const { connect, connection } = require("mongoose");

const connection = "mongodb://127.0.0.1:27017/socialDB";

connect(connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
