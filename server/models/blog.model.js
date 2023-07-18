import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  featured: {
    type: String,
    default: "off",
  },
  post_by: {
    type: String,
    default: "Manager",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Blogs = mongoose.model("Blogs", blogSchema);
export default Blogs;
