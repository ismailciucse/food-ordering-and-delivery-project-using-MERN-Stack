import express from "express";
import multer from "multer";
import Users from "../models/user.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Users.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "Already registered." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/users/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash("admin", saltRounds, async (err, hash) => {
        const newUser = new Users({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
          thumb: avatar,
          position: req.body.position,
          address: req.body.address,
        });
        await newUser.save().then((data) => {
          res.json({ message: "User added successfull." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// ALL USER
router.get("/", async (req, res) => {
  await Users.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No user found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find user." });
    });
});

// SINGLE USER
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Users.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No user found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find user." });
    });
});

// UPDATE USER
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

    await Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(oldPassword, admin.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Users.findByIdAndUpdate(
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
    await Users.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Can not update." });
        } else {
          res.json({ data, message: "User updated." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating user." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/users/${oldThumb}`);

    await Users.findByIdAndUpdate(
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
          res.json({ message: "Update successfull." });
        }
      })
      .catch((err) => {
        res.json({ message: "Error updatating user." });
      });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;

  // const filePath = `uploads/users/${thumb}`;
  // const copy = `uploads/copy/${thumb}`;
  // fs.copyFile(filePath, copy, (error) => {
  //   if (error) {
  //     throw error;
  //   } else {
  //     console.log("File has been moved to another folder.");
  //   }
  // });

  fs.unlinkSync(`uploads/users/${thumb}`);

  await Users.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("User deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting user." });
    });
});

export default router;
