const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});




userSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) {
        return next();
    }

    bcryptjs.genSalt(10, (err,salt) => {
        if(err) {
            return next(err);
        }

        bcryptjs.hash(user.password, salt, (err,hash) => {
            if(err) {
                return next(err);
            }

            user.password = hash;
            next();
        })
    })
});



mongoose.model('User', userSchema);