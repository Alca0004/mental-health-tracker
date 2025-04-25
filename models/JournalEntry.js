import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mood: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
