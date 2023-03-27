const router = require("express").Router();
// calls functions from user controller
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  byeFriend,
} = require("../../controllers/userController");
// sets us get and post routes
// router.route creates a route object, which allows get and post to be combined and tied to the "/" route
router.route("/").get(getUsers).post(createUser);
// sets get, post, delete for the "/:userId route"
router.route("/:userId").get(getSingleUser).delete(deleteUser).put(updateUser);
// sets delete and post for the "/:friendId route"
router.route("/:userId/friends/:friendId").delete(byeFriend).post(addFriend);

module.exports = router;
