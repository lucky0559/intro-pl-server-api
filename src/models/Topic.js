const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    title:{
        type:String,
    },
    image_url: {
        type:String
    },
    info: {
        type: String
    }
})

mongoose.model('Topic', topicSchema);