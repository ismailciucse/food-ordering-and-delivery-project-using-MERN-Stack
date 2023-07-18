import express from "express";
import DeliveryMen from "../models/deliveryMan.model.js";
const router = express.Router();
import bcrypt from "bcrypt";

// DELIVERY MAN LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await DeliveryMen.findOne({ email: email }).then((deliveryman) => {
      if (deliveryman) {
        bcrypt.compare(password, deliveryman.password, (err, result) => {
          if (result === true) {
            res.json({ deliveryman, message: "Login success." });
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
