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

const deliveryManSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  thumb: {
    type: String,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
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
  completeOrders: {
    type: Number,
    default: 0,
  },
  pendingOrders: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const DeliveryMen = mongoose.model("DeliveryMen", deliveryManSchema);
export default DeliveryMen;
