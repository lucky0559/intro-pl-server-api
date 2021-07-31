const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

topicSchema.methods.compareTopic = function(candidateTitle) {
    const topic = this;

    return new Promise((resolve, reject) => {
        compare(candidateTitle, topic.title, (err, isMatch) => {
            if(err) {
                return reject(err);
            }
            if(!isMatch) {
                return reject(false);
            }

            resolve(true);
        })
    })
}

mongoose.model('Topic', topicSchema);