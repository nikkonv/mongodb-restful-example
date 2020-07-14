const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

// submit post
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err }));
});

// get specific post
router.get("/:postId", (req, res) => {
  Post.findById(req.params.postId)
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// delete a post
router.delete("/:postId", (req, res) => {
  Post.remove({ _id: req.params.postId })
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

// update a post
router.patch("/:postId", (req, res) => {
  Post.updateOne(
    { _id: req.params.postId },
    {
      $set: { title: req.body.title, description: req.body.description },
    }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
