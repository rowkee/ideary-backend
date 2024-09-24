import express from "express";
const router = express.Router();
import {
  getAllIdeas,
  getIdeaById,
  postIdea,
  updateIdeaById,
  deleteIdeaById,
} from "../controllers/ideaController.js";

router.get("/", getAllIdeas);

router.get("/:id", getIdeaById);

router.post("/", postIdea);

router.patch("/:id", updateIdeaById);

router.delete("/:id", deleteIdeaById);

export default router;
