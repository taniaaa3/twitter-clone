const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSECRETKEY = process.env.JWTSECRETKEY;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    location: {
        type: String,
    },
    dob: {
        type: Date
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    }
}, 
{
    timestamps: true
})

// Hashing the password before creating the user
userSchema.pre('save',async function(next){
    const user = this
    try {
        const password = await bcrypt.hash(user.password, 10);
        user.password = password;
    } catch (error) {
        next(error)
    }
})

// Generating token for user
userSchema.methods.generateToken = async function (next){
    const user = this;
    try {
        return jwt.sign({
            id: user._id.toString(),
            email: user.email,
            username: user.username
        },
        JWTSECRETKEY,
        {
            expiresIn: '15d'
        })
    } catch (error) {
        next (error)
    }
}

// comparing the user password before login
userSchema.methods.comparePassword = async function (password){
    try {
        return bcrypt.compare(password, this.password);
    } catch (error) {
        console.log(error);
    }
}

const User = new mongoose.model('user',userSchema);

module.exports = User;