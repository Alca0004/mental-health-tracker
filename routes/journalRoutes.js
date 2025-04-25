import express from "express";
import JournalEntry from "../models/JournalEntry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { mood, content } = req.body;

    const newEntry = new JournalEntry({ mood, content });
    await newEntry.save();

    res.status(201).json({ message: "Journal entry saved!", entry: newEntry });
  } catch (error) {
    res.status(500).json({ error: "Failed to save journal entry." });
  }
});

router.get("/", (req, res) => {
  res.send("GET /api/journal is working!");
});

export default router;
