const { createMemeServ } = require("../services/authServices");
const { getAllMemes } = require('../services/postServices');

const createMeme = async (req, res) => {
    try {

        const { userId, tags, image } = req.body;
        if (!tags || tags.length === 0) {
            return res.status(400).json({ message: 'No tags selected.' });
        }
        if (!userId || !image) {
            return res.status(400).json({ message: 'userID, caption and are required.' });
        }
        const newPost = await createMemeServ({
            userId: userId,
            tags: tags,
            image

        })

        res.status(201).json({
            message: 'Post created successfully!',
            post: newPost,
        });

    } catch (error) {
        console.error('Error Posting post:', error);
        res.status(500).json({ message: 'Error Posting post.', error: error.message });
    }
}

const getMemes = async (req, res) => {
    try {
        const { tags, skip, limit = 9 } = req.query;
        const { memes, totalRecords, totalPages } = await getAllMemes(tags, skip, parseInt(limit));
        res.status(200).json({
            memes,
            totalRecords,
            totalPages,
        });
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: 'Error fetching memesss' });
    }
};





const getSearchedMemes = async (req, res) => {
    try {
        const { tags } = req.query;
        // const limit = 5;
        // const skip = (page - 1) * limit;
        if (!tags || tags.length === 0) {
            return res.status(400).json({ message: "Tags are required for searching memes." });
        }
        const memes = await getAllSearchedMemes(tags);
        res.status(200).json(memes);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching memes' });
    }
};





module.exports = {
    createMeme,
    getMemes,
    getSearchedMemes
};

