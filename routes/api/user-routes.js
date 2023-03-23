const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  byeFriend,
} = require("../../controllers/userController");

router.route("/").get(getUsers).post(createUser);
router.route("/:userId").get(getSingleUser).delete(deleteUser).post(updateUser);
router.route("/:userId/friends/:friendId").delete(byeFriend).post(addFriend);

module.exports = router;
