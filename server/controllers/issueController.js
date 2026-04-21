const Issue = require("../models/Issue");

// @desc    Create issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
  try {
    const { title, description, status, priority, severity } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const issue = await Issue.create({
      title,
      description,
      status: status || "Open",
      priority: priority || "Medium",
      severity: severity || "",
      createdBy: req.user._id,
    });

    return res.status(201).json(issue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get all issues
// @route   GET /api/issues
// @access  Private
const getIssues = async (req, res) => {
  try {
    const { search = "", status, priority } = req.query;

    const query = {
      createdBy: req.user._id,
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    const issues = await Issue.find(query).sort({ createdAt: -1 });

    return res.status(200).json(issues);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Private
const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedIssue);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (issue.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    await issue.deleteOne();

    return res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};