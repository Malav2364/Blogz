
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: {
        type: [String],
    },
    imageUrl: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
