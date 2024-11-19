import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import {
  createComment,
  getCommentsByIdeaId,
  updateCommentById,
  deleteCommentById,
} from "../controllers/commentController.js";

const router = express.Router();

// Public route - anyone can read comments
router.get("/:ideaId", getCommentsByIdeaId);

// Protected routes - require authentication
router.use(requireAuth);

router.post("/", createComment);

router.patch("/:id", updateCommentById);

router.delete("/:id", deleteCommentById);

export default router;
