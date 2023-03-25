const { connect, connection } = require("mongoose");
// sets mongodb connection 
// ask why when written like example, it didnt work
connect("mongodb://localhost:27017/socialDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
