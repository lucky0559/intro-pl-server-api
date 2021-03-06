const express = require('express');
const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/topic', async(req, res) => {
    const {title, image_url, info} = req.body;


    const response = await Topic.findOne({title});
        if(response) {
            return res.status(404).send({error: 'Existing Topic'})
        }


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


// router.get('/topic/:title', async(req, res) => {
//     const {title} = req.body;
//     const topic = await Topic.findOne({title});

//     if(topic) {
//         return res.status(404).send({error: 'Existing topic'})
//     }
//     res.send("Added");
// })



router.delete('/topic/:_id', async(req, res) => {

    const id = req.params._id;

    try {
        const result = await Topic.findByIdAndDelete(id);
        res.send(result)
    }
    catch(error) {
        console.log(error.message)
    }

});




module.exports = router;