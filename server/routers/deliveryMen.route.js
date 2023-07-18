import express from "express";
import multer from "multer";
import DeliveryMen from "../models/deliveryMan.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
// import Orders from "../models/order.model.js";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/delivery-men/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE DELIVERY MEN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await DeliveryMen.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Already registered." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/delivery-men/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash("admin", saltRounds, async (err, hash) => {
        const newDeliveryMen = new DeliveryMen({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newDeliveryMen.save().then((data) => {
          res.json({ message: "Registration successfull." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// ALL DELIVERY MEN
router.get("/", async (req, res) => {
  await DeliveryMen.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No delivery men found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find delivery men." });
    });
});

// SINGLE DELIVERY MEN
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await DeliveryMen.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No delivery man found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find delivery man." });
    });
});

// UPDATE DELIVERY MEN
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await DeliveryMen.findOne({ email: email }).then((deliveryMan) => {
      if (deliveryMan) {
        bcrypt.compare(oldPassword, deliveryMan.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await DeliveryMen.findByIdAndUpdate(
                id,
                { password: hash },
                {
                  useFindAndModify: false,
                }
              )
                .then((data) => {
                  if (!data) {
                    res.json({ message: "Can not update." });
                  } else {
                    res.json({ message: "Updated successful." });
                  }
                })
                .catch((err) => {
                  res.json({ message: "Error updatating customer." });
                });
            });
          } else {
            res.json({ message: "Old password doesn't match." });
          }
        });
      } else {
        res.json({ message: "Something wrong." });
      }
    });
  } else if (req.body.thumb) {
    await DeliveryMen.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ data, message: "Delivery men updated." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating delivery men." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/delivery-men/${oldThumb}`);

    await DeliveryMen.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ message: "Delivery men updated." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating delivery men." });
      });
  }
});

// DELETE DELIVERY MEN
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/delivery-men/${thumb}`);

  await DeliveryMen.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Delivery men deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting delivery men." });
    });
});

// DELIVERY MAN REVIEW
router.post("/:id/review", async (req, res) => {
  try {
    const { name, rating, comment, customer_id, deliveryManID } = req.body;
    const deliveryMan = await DeliveryMen.findById(deliveryManID);
    if (deliveryMan) {
      const review = {
        name,
        rating: Number(rating),
        comment,
        customer: customer_id,
      };
      deliveryMan.reviews.push(review);
      deliveryMan.totalReviews = deliveryMan.reviews.length;
      deliveryMan.rating =
        deliveryMan.reviews.reduce((acc, item) => item.rating + acc, 0) /
        deliveryMan.reviews.length;
      await deliveryMan.save().then((data) => {
        res.json({ message: "Successfully reviewed." });
      });
    } else {
      res.json({ message: "Delivery Man not found." });
    }
  } catch (error) {
    res.json({ message: "Something wrong." });
  }
});

export default router;
