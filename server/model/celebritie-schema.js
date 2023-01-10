import mongoose from "mongoose";

const celebritieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first: {
    type: String,
    required: true,
    trim: true,
  },
  last: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  picture: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Celebritie = mongoose.model("celebritie", celebritieSchema);
export default Celebritie;
