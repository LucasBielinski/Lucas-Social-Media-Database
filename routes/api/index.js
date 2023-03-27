const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");
// uses user routes when /users is called
router.use("/users", userRoutes);
// uses thoughts routes when /thoughts is called
router.use("/thoughts", thoughtRoutes);

module.exports = router;
