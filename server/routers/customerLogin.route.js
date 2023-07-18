import express from "express";
import Customers from "../models/customer.model.js";
const router = express.Router();
import bcrypt from "bcrypt";

// CUSTOMER LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Customers.findOne({ email: email }).then((customer) => {
      if (customer) {
        bcrypt.compare(password, customer.password, (err, result) => {
          if (result === true) {
            res.json({ customer, message: "Login success." });
          } else {
            res.json({ message: "Password doesn't match." });
          }
        });
      } else {
        res.json({ message: "Email doesn't exist." });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
