import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  definition: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
 
});

const FolderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    flashcards: {
      type: [FlashcardSchema],
      default: [],
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
export default Folder;
