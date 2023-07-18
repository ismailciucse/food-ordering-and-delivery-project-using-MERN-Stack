import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
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
  },
  address: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Customers = mongoose.model("Customers", customerSchema);
export default Customers;
