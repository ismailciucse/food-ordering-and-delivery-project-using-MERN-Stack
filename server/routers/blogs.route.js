import express from "express";
import multer from "multer";
import Blogs from "../models/blog.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogs/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE BLOG
router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newBlog = new Blogs({
      title: req.body.title,
      thumb: req.file.filename,
      featured: req.body.featured,
      description: req.body.description,
    });
    await newBlog.save().then((data) => {
      res.send("Blog added.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL BLOG
router.get("/", async (req, res) => {
  await Blogs.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No blog found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find blog." });
    });
});

// SINGLE BLOG
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Blogs.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No blog found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find blog." });
    });
});

// UPDATE BLOG
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.thumb) {
    await Blogs.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Can not update." });
        } else {
          res.send("Blog updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating blog." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/blogs/${oldThumb}`);

    await Blogs.findByIdAndUpdate(
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
          res.send("Blog updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating blog." });
      });
  }
});

// DELETE BLOG
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/blogs/${thumb}`);

  await Blogs.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Blog deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting blog." });
    });
});

export default router;
