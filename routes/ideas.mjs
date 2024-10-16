import express from "express";

import {
  getAllIdeas,
  getIdeaById,
  postIdea,
  updateIdeaById,
  deleteIdeaById,
  getIdeasByUserId,
} from "../controllers/ideaController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

// allow anyone to get all of the ideas, protect the functionality
router.get("/", getAllIdeas);

// require auth for all idea routes
router.use(requireAuth);

router.get("/account", getIdeasByUserId);

router.get("/:id", getIdeaById);

router.post("/", postIdea);

router.patch("/:id", updateIdeaById);

router.delete("/:id", deleteIdeaById);

export default router;
