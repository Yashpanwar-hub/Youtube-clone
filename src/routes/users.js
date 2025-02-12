const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Video = require('../models/Video');

// Subscribe/Unsubscribe to channel
router.put('/subscribe/:channelId', auth, async (req, res) => {
  try {
    const channel = await User.findById(req.params.channelId);
    const subscriber = await User.findById(req.user.id);

    if (!channel || !subscriber) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if already subscribed
    if (subscriber.subscribedTo.includes(channel._id)) {
      // Unsubscribe
      subscriber.subscribedTo = subscriber.subscribedTo.filter(
        sub => sub.toString() !== channel._id.toString()
      );
      channel.subscribers = channel.subscribers.filter(
        sub => sub.toString() !== subscriber._id.toString()
      );
    } else {
      // Subscribe
      subscriber.subscribedTo.unshift(channel._id);
      channel.subscribers.unshift(subscriber._id);
    }

    await subscriber.save();
    await channel.save();

    res.json({
      subscribedTo: subscriber.subscribedTo,
      subscribers: channel.subscribers
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's channel
router.get('/channel/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('subscribers', ['name', 'avatar'])
      .populate('subscribedTo', ['name', 'avatar']);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const videos = await Video.find({ user: req.params.userId })
      .sort({ createdAt: -1 });

    res.json({ user, videos });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; 