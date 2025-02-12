const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');
const Video = require('../models/Video');

// Add comment
router.post('/:videoId', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);
    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    const newComment = new Comment({
      text: req.body.text,
      user: req.user.id,
      video: req.params.videoId
    });

    const comment = await newComment.save();
    await comment.populate('user', ['name', 'avatar']);

    // Add comment to video
    video.comments.unshift(comment._id);
    await video.save();

    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get comments for video
router.get('/:videoId', async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate('user', ['name', 'avatar'])
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete comment
router.delete('/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await comment.remove();

    // Remove comment from video
    const video = await Video.findById(comment.video);
    video.comments = video.comments.filter(
      comm => comm.toString() !== req.params.id
    );
    await video.save();

    res.json({ msg: 'Comment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 