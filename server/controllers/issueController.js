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
// @route   GET /api/issues?page=1&limit=10
// @access  Private
const getIssues = async (req, res) => {
  try {
    const { search = "", status, priority, page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * pageLimit;

    const query = {
      createdBy: req.user._id,
    };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (status && status !== "All Statuses") {
      query.status = status;
    }

    if (priority && priority !== "All Priorities") {
      query.priority = priority;
    }

    const total = await Issue.countDocuments(query);
    const issues = await Issue.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageLimit);

    return res.status(200).json({
      issues,
      pagination: {
        total,
        page: pageNum,
        limit: pageLimit,
        pages: Math.ceil(total / pageLimit),
      },
    });
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