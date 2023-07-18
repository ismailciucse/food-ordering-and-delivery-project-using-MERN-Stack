import express from "express";
import multer from "multer";
import Foods from "../models/food.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";

// FILE UPLOAD
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/foods/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

// CREATE FOOD
router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newFood = new Foods({
      title: req.body.title,
      thumb: req.file.filename,
      price: Number(req.body.price),
      featured: req.body.featured,
      active: req.body.active,
      category: req.body.category,
      description: req.body.description,
    });
    await newFood.save().then((data) => {
      res.send("Food added successfull.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL FOODS
router.get("/", async (req, res) => {
  const { q } = req.query;
  if (q) {
    await Foods.find()
      .sort({ _id: -1 })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No food found." });
        } else {
          const keys = ["title"];
          const search = (data) => {
            return data.filter((item) =>
              keys.some((key) => item[key].toLowerCase().includes(q))
            );
          };
          res.json(search(data).splice(0, 10));
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error to find food." });
      });
  } else {
    await Foods.find()
      .sort({ _id: -1 })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No food found." });
        } else {
          res.status(200).send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error to find food." });
      });
  }
});

// RECOMMENDED FOODS
router.get("/recommended", async (req, res) => {
  await Foods.find()
    .sort({ rating: -1, totalReviews: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No food found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find food." });
    });
});

// SINGLE FOOD
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Foods.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No food found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find food." });
    });
});

// UPDATE FOOD
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Data to update can not be empty." });
  }
  // If no new thumbnail found.
  if (req.body.thumb) {
    await Foods.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Can not update." });
        } else {
          res.send("Food updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating food." });
      });
  } else if (req.file.filename) {
    // Delete old thumbnail
    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/foods/${oldThumb}`);

    await Foods.findByIdAndUpdate(
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
          res.send("Food updated.");
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error updatating food." });
      });
  }
});

// DELETE FOOD
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/foods/${thumb}`);

  await Foods.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Food deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting food." });
    });
});

// FOOD REVIEW
router.post("/:id/review", async (req, res) => {
  const id = req.params.id;
  try {
    const { name, rating, comment, customer_id } = req.body;
    const food = await Foods.findById(id);
    if (food) {
      const review = {
        name,
        rating: Number(rating),
        comment,
        customer: customer_id,
      };
      food.reviews.push(review);
      food.totalReviews = food.reviews.length;
      food.rating =
        food.reviews.reduce((acc, item) => item.rating + acc, 0) /
        food.reviews.length;
      await food.save().then((data) => {
        res.json({ message: "Successfully reviewed." });
      });
    } else {
      res.json({ message: "Food not found." });
    }
  } catch (error) {
    res.json({ message: "Something wrong." });
  }
});

export default router;
