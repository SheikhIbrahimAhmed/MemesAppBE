const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({

    tags: {
        type: Array,
        of: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
}, { timestamps: true });

const Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
