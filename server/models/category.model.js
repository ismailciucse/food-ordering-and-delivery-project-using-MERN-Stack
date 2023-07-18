import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
  },
  featured: {
    type: String,
    default: "off",
  },
  active: {
    type: String,
    default: "off",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Categories = mongoose.model("Categories", categorySchema);
export default Categories;
