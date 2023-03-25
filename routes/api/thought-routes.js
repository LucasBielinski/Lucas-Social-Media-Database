const router = require("express").Router();
// calls functions from thought controller
const {
  getThought,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReact,
} = require("../../controllers/thoughtController");
// sets us get and post routes
// router.route creates a route object, which allows get and post to be combined and tied to the "/" route
// double check
router.route("/").get(getThought).post(createThought);
// sets get, put, delete for the "/:thoughtId route"
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought);
// sets post and delete routes for "/:thoughtId/reactions" and "/:thoughtId/reactions/:reactionId"
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(removeReact);

module.exports = router;
