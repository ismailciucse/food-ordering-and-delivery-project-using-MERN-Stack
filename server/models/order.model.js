import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderID: {
    type: String,
    require: true,
  },
  customer_id: {
    type: String,
    require: true,
  },
  customer_name: {
    type: String,
    require: true,
  },
  items: [
    {
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
      quantity: {
        type: Number,
        require: true,
      },
      itemTotal: {
        type: Number,
        require: true,
      },
      review: {
        type: String,
        default: "No",
      },
    },
  ],
  total_foods: {
    type: Number,
    require: true,
  },
  total_quantity: {
    type: Number,
    require: true,
  },
  deliveryCost: {
    type: Number,
  },
  total_price: {
    type: Number,
    require: true,
  },
  order_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Ordered",
  },
  phone: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  payment: {
    type: String,
  },
  accept_time: {
    type: Date,
  },
  exp_time: {
    type: String,
    default: "0",
  },
  delivery_man_id: {
    type: String,
    default: "NaN",
  },
  delivery_man_name: {
    type: String,
    default: "NaN",
  },
  deliveryManReview: {
    type: String,
    default: "No",
  },
  foodReview: {
    type: String,
    default: "No",
  },
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
