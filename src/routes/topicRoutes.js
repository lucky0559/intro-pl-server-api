const express = require('express');
const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');

const router = express.Router();

router.post('/topic', async(req, res) => {
    const {uid,title, image_url, info} = req.body;

    try {
        const topic = new Topic({uid, title,image_url, info});
        await topic.save();
    }
    catch(err) {
        return res.status(422).send({error: "Something went wrong in saving topic"})
    }
})

module.exports = router;