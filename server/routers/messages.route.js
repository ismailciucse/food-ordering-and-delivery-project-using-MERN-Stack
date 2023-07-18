import express from "express";
import Messages from "../models/message.model.js";
const router = express.Router();

// CREATE MESSAGE
router.post("/", async (req, res) => {
  try {
    const newMessage = new Messages({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      phone: req.body.phone,
      message: req.body.message,
      read: req.body.read,
    });
    await newMessage.save().then((data) => {
      res.send("Message added.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL MESSAGE
router.get("/", async (req, res) => {
  await Messages.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No message found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find message." });
    });
});

// SINGLE MESSAGE
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Messages.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No message found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error to find message." });
    });
});

// UPDATE READ STATUS
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  await Messages.findByIdAndUpdate(
    id,
    { read: "Yes" },
    {
      useFindAndModify: false,
    }
  )
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not update." });
      } else {
        res.send("Message status updated.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error updatating message status." });
    });
});

// DELETE MESSAGE
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Messages.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete." });
      } else {
        res.status(200).send("Message deleted.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error deleting message." });
    });
});

export default router;
