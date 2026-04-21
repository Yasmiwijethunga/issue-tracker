const express = require("express");
const {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createIssue).get(protect, getIssues);

router
  .route("/:id")
  .get(protect, getIssueById)
  .put(protect, updateIssue)
  .delete(protect, deleteIssue);

module.exports = router;