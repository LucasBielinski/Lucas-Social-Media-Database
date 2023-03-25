const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;
const app = express();
// tells express to use urlencoded, allowing array, string, and objects to be passed
app.use(express.urlencoded({ extended: true }));
// allows express to use JSON payloads in routes
app.use(express.json());
// allows the server to use routes
app.use(routes);
// connects to the database, one prevents multiple executions of the code block
//please explain once
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
  });
});
