const Comment = require("../models/comment.model");

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).populate("commentOwner")
    .populate("product");
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCommentsByUser = async (req, res) => {
  try {
    const comments = await Comment.find({ commentOwner: req.params.user }).populate("commentOwner")
    .populate("product");
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getCommentsByProduct = async (req, res) => {
  try {
    const comments = await Comment.find({ product: req.params.product }).populate("commentOwner")
    .populate("product");
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("commentOwner")
      .populate("product");
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create comment
exports.createComment = async (req, res) => {
  try {
    const { commentOwner, content, product } = req.body;
    const newComment = new Comment({ commentOwner, content, product });
    const commentSaved = await newComment.save();
    res.json(commentSaved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Edit comment
exports.editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    const { content } = req.body;
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    await comment.remove();
    res.json({ msg: "Comment removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
