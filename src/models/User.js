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

userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcryptjs.compare(candidatePassword, user.password, (err, isMatch) => {
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



mongoose.model('User', userSchema);