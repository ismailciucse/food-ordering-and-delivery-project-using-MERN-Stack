import express from "express";
import multer from "multer";
import Customers from "../models/customer.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE CUSTOMER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Customers.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Already registered." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/customers/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newCustomer = new Customers({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newCustomer.save().then((data) => {
          res.json({ data, message: "Registration successfull." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// ALL CUSTOMER
router.get("/", async (req, res) => {
  await Customers.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No customer found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find customer." });
    });
});

// SINGLE CUSTOMER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Customers.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No customer found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find customer." });
    });
});

// UPDATE CUSTOMER
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.json({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await Customers.findOne({ email: email }).then((customer) => {
      if (customer) {
        bcrypt.compare(oldPassword, customer.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Customers.findByIdAndUpdate(
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
                    res.json({ message: "Updated successfull." });
                  }
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error updatating customer." });
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
    await Customers.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ data, message: "Updated successful." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating customer." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/customers/${oldThumb}`);

    await Customers.findByIdAndUpdate(
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
          res.json({ message: "Update Successfull." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating customer." });
      });
  }
});

// DELETE CUSTOMER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/customers/${thumb}`);

  await Customers.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Customer deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting customer." });
    });
});

export default router;
