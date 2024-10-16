import Idea from "../models/ideasModel.js";
import mongoose from "mongoose";

const getAllIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({})
      .populate("createdBy")
      .sort({ createdAt: -1 });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIdeasByUserId = async (req, res) => {
  const userId = req.query.userId;
  console.log(userId);
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   return res.status(404).json({ error: "ID incorrect format" });
  // }
  try {
    const ideas = await Idea.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIdeaById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID incorrect format" });
  }
  try {
    const idea = await Idea.findById(id);
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postIdea = async (req, res) => {
  const { title, description, createdBy } = req.body;

  // checking if all fields are filled
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!description) emptyFields.push("description");
  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all of the required fields.",
      emptyFields,
    });
  }

  try {
    const idea = await Idea.create({ title, description, createdBy });
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateIdeaById = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID incorrect format" });
  }
  try {
    const idea = await Idea.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.status(200).json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteIdeaById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID incorrect format" });
  }

  try {
    // Find the idea first
    const idea = await Idea.findById(id).populate("createdBy");
    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const userIdFromHeaders = req.headers["x-user-id"];

    if (idea.createdBy._id.toString() !== userIdFromHeaders.toString()) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this idea" });
    }

    const deletedIdea = await Idea.deleteOne({ _id: id });

    res
      .status(200)
      .json({ message: "Idea deleted successfully", idea: deletedIdea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllIdeas,
  postIdea,
  getIdeaById,
  updateIdeaById,
  deleteIdeaById,
  getIdeasByUserId,
};
