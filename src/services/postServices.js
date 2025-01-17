const mongoose = require('mongoose');
const Meme = require('../models/memeModel');





const getAllMemes = async (userId, tags, skip, limit) => {

    try {

        const myMemes = {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        }
        const tagsMemes = {
            $match: {
                tags: { $in: tags },
            },
        }
        let aggregationPipeline = [{
            $skip: skip,
        },
        {
            $limit: limit,
        },];
        if (userId) {
            aggregationPipeline.unshift(myMemes)
        }
        if (tags) {
            aggregationPipeline.unshift(tagsMemes)
        }
        console.log("agg pipeline", aggregationPipeline)
        const memes = await Meme.aggregate(aggregationPipeline);
        return memes;

    } catch (error) {
        console.log(error?.message)
        throw new Error('Error fetching my memes');
    }
};





module.exports = {
    getAllMemes
};
