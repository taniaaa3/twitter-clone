const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }, 
    tweetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user"
    },
    retweetBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "user"
    },
    image: {
        type: String
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "tweet",
        default: []
    }
},
{
    timestamps: true
})

const Tweet = new mongoose.model("tweet", tweetSchema);

module.exports = Tweet;