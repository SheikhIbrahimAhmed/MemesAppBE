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
    categoryId: {
        ref: 'Category',
        type: mongoose.Schema.Types.ObjectId
    }

}, { timestamps: true });

const Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
