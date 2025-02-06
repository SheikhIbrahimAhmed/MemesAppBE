const { getAllMemes, createMemeServ, getAllCategories } = require("../services/postServices");
const Category = require('../models/categoryModel');
const createMeme = async (req, res) => {
    try {

        const { tags, categoryId, image } = req.body;
        if (!tags || tags.length === 0) {
            return res.status(400).json({ message: 'No tags selected.' });
        }
        if (!image) {
            return res.status(400).json({ message: 'Image is Required.' });
        }
        const newPost = await createMemeServ({
            tags: tags,
            categoryId: categoryId,
            image

        })

        res.status(201).json({
            message: 'Meme posted successfully!',
            post: newPost,
        });

    } catch (error) {
        console.error('Error Posting meme:', error);
        res.status(500).json({ message: 'Error Posting meme.', error: error.message });
    }
}

const getMemes = async (req, res) => {
    try {
        const { tags, skip, limit = 9, category } = req.query;
        console.log("category in controller", category)
        const { memes, totalRecords, totalPages } = await getAllMemes(tags, skip, parseInt(limit), category);
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

const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        console.log("cats", categories)
        res.status(200).json(
            categories
        );
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ message: 'Error fetching categories' });
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
    getSearchedMemes,
    getCategories
};

