const mongoose = require('mongoose');
const Meme = require('../models/memeModel');
const Category = require('../models/categoryModel')


const createMemeServ = async (obj) => {
    try {
        return await Meme.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}


const getAllMemes = async (tags, skip, limit, category) => {
    const searchTags = tags?.split(",").map(tag => tag.trim()).filter(Boolean) || [];
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;



    try {
        const matchConditions = [];

        // Handle Tag-based Search
        if (searchTags.length) {
            matchConditions.push({
                $or: searchTags.map(tag => ({
                    tags: { $elemMatch: { $regex: tag, $options: "i" } },
                })),
            });
        }
        if (category) {
            matchConditions.push({ categoryId: new mongoose.Types.ObjectId(category) });
        }

        const aggregationPipeline = [
            {
                $match: matchConditions.length ? { $or: matchConditions } : {}
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
        ];


        console.log("Aggregation Pipeline:", JSON.stringify(aggregationPipeline, null, 2));
        const memes = await Meme.aggregate(aggregationPipeline);

        // Count total records for pagination
        const countPipeline = [
            { $match: matchConditions.length ? { $or: matchConditions } : {} },
            { $count: "total" },
        ];

        const countResult = await Meme.aggregate(countPipeline);
        const totalRecords = countResult.length > 0 ? countResult[0].total : 0;
        const totalPages = Math.ceil(totalRecords / limit);

        console.log("Total Pages:", totalPages);
        console.log("Total Records:", totalRecords);

        return {
            memes,
            totalRecords,
            totalPages,
        };
    } catch (error) {
        console.error("Error fetching memes:", error.message);
        throw new Error("Error fetching memes");
    }
};



const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        throw new Error("Error fetching categories");
    }
};








module.exports = {
    getAllMemes,
    createMemeServ,
    getAllCategories
};
