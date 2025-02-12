const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Video = require('../models/Video');
const User = require('../models/User');
const { upload } = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

// Upload video and thumbnail
router.post('/upload', auth, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ msg: 'Please upload both video and thumbnail' });
    }

    const video = new Video({
      title,
      description,
      videoUrl: req.files.video[0].path,
      thumbnail: req.files.thumbnail[0].path,
      user: req.user.id
    });

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all videos (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const videos = await Video.find()
      .populate('user', ['name', 'avatar'])
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Video.countDocuments();

    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalVideos: total
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('user', ['name', 'avatar'])
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'name avatar' }
      });

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    // Increment view count
    video.views += 1;
    await video.save();

    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Like/Unlike video
router.put('/like/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    // Check if video has already been liked
    if (video.likes.includes(req.user.id)) {
      // Unlike
      video.likes = video.likes.filter(like => like.toString() !== req.user.id);
    } else {
      // Like
      video.likes.unshift(req.user.id);
      // Remove from dislikes if exists
      video.dislikes = video.dislikes.filter(
        dislike => dislike.toString() !== req.user.id
      );
    }

    await video.save();
    res.json(video);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Search videos
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const videos = await Video.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .populate('user', ['name', 'avatar'])
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete video
router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ msg: 'Video not found' });
    }

    // Check user
    if (video.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete from Cloudinary
    if (video.cloudinaryVideoId) {
      await cloudinary.uploader.destroy(video.cloudinaryVideoId, { resource_type: 'video' });
    }
    if (video.cloudinaryThumbnailId) {
      await cloudinary.uploader.destroy(video.cloudinaryThumbnailId);
    }

    await video.remove();
    res.json({ msg: 'Video removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 