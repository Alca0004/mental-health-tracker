import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import JournalEntry from "./models/JournalEntry.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//test route
app.get("/", (req, res) => {
  res.send("Root route is working");
});

//Placeholder route

app.post("/api/journal", async (req, res) => {
  try {
    const { mood, content } = req.body;

    const newEntry = new JournalEntry({ mood, content });
    await newEntry.save();

    res.status(201).json({
      message: "Journal entry saved!",
      entry: newEntry,
    });
  } catch (err) {
    console.error("Failed to save entry:", err);
    res.status(500).json({ error: "Could not save journal entry" });
  }
});

const PORT = 5050;

mongoose
  .connect(process.env.MONGO_URI) // This tells mongodb to connect to connect to the database using URI from my env file
  .then(() => {
    // if the connection succeeds then this runs
    app.listen(PORT, () => {
      // Once im connected successfully then start the express server
      console.log(`Connected to MongoDB`);
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // If it fails it runs this
    console.error("MongoDB connection failed:", err);
  });
