const express = require('express');
const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/topic', async(req, res) => {
    const {title, image_url, info} = req.body;

    try {
        const topic = new Topic({uid: req.user._id, title, image_url, info});
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
});



router.delete('/topic', async(req, res) => {

const {title} = req.body;

    Topic.remove({
        title: title
    }), function (err, topic) {
        if(err) {
            return res.send(err);
        }

        res.send("Deleted");
    }
});




module.exports = router;