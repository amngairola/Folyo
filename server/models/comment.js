import mongoose from "mongoose";

// Define the structure and rules for the 'blog' collection in MongoDB
const commentSchema = new mongoose.Schema({
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
});

// Create the Mongoose model based on the schema
const comment = mongoose.model("comment", commentSchema);

export default comment;
