const router = require("express").Router();
const apiRoutes = require("./api");
// uses the api routes when called
router.use("/api", apiRoutes);
// "puts wrong route when calling a route that dosent exist"
router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
