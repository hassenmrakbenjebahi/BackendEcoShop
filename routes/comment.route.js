const express = require("express");
const router = express.Router();
const {
  getComments,
  getCommentsByUser,
  getCommentsByProduct,
  getCommentById,
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/comment.controller");

router.get("/", getComments);

router.get("/getCommentsByUser/:user", getCommentsByUser);

router.get("/getCommentsByProduct/:product", getCommentsByProduct);

router.get("/:id", getCommentById);

router.post("/", createComment);

router.put("/:id", editComment);

router.delete("/:id", deleteComment);

module.exports = router;
