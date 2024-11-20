import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

const createComment = async (req, res) => {
  const { content, ideaId, authorId, username } = req.body;

  try {
    const comment = await Comment.create({
      content,
      ideaId,
      authorId,
      username,
    });
    const populatedComment = await Comment.findById(comment._id).populate(
      "authorId",
      "username"
    );
    res.status(200).json(populatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCommentsByIdeaId = async (req, res) => {
  const { ideaId } = req.params;

  try {
    const comments = await Comment.find({ ideaId })
      .populate("authorId", "username")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCommentById = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Comment not found" });
  }

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCommentById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Comment not found" });
  }

  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export {
  createComment,
  getCommentsByIdeaId,
  updateCommentById,
  deleteCommentById,
};
