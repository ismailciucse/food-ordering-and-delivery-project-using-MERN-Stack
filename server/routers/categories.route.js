import express from "express";
import multer from "multer";
import Categories from "../models/category.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE CATEGORY
router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newCategory = new Categories({
      title: req.body.title,
      thumb: req.file.filename,
      featured: req.body.featured,
      active: req.body.active,
    });
    await newCategory.save().then((data) => {
      res.send("Category added.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL CATEGORY
router.get("/", async (req, res) => {
  await Categories.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No category found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find category." });
    });
});

// SINGLE CATEGORY
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Categories.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No category found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find category." });
    });
});

// UPDATE CATEGORY
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.thumb) {
    await Categories.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Can not update." });
        } else {
          res.send("Category updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating category." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/categories/${oldThumb}`);

    await Categories.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Can not update." });
        } else {
          res.send("Category updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating category." });
      });
  }
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/categories/${thumb}`);

  await Categories.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Category deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting category." });
    });
});

export default router;
