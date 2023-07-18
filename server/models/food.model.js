import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectID,
    require: true,
    ref: "Customers",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const foodSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  featured: {
    type: String,
    default: "off",
  },
  active: {
    type: String,
    default: "off",
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    require: true,
    default: 0,
  },
  totalReviews: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Foods = mongoose.model("Foods", foodSchema);
export default Foods;
