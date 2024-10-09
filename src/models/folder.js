import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
  },
  translate: {
    type: [String],
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
  },
  { timestamps: true }
);

const Folder = mongoose.models.Folder || mongoose.model("Folder", FolderSchema);
export default Folder;
