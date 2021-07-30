const express = require('express');
const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');

const router = express.Router();

router.post('/topic', async(req, res) => {
    const {uid, title, image_url, info} = req.body;

    try {
        const topic = new Topic({uid, title, image_url, info});
        await topic.save();
        res.send("Saved");
    }
    catch(err) {
        return res.status(422).send({error: "Something went wrong in saving topic"})
    }
});

router.get('/topic', async(req, res) => {
    const topics = await Topic.find({uid: req.user._id});
    res.send(topics);
})

module.exports = router;