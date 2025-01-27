const mongoose = require('mongoose');
const Meme = require('../models/memeModel');



const createMemeServ = async (obj) => {
    try {
        return await Meme.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}


// const getAllMemes = async (tags, skip, limit, category) => {
//     const searchTags = tags.split(",").map(tag => {
//         if (tag) {
//             return tag.trim()
//         }
//     });
//     skip = Number(skip);
//     try {

//         const tagsMemes = {
//             $match: {
//                 $or: searchTags.map(tag => ({
//                     tags: { $elemMatch: { $regex: tag, $options: "i" } },
//                 })),
//             },
//         };
//         const categoryMemes = {
//             $match: {
//                 category: { $regex: category, $options: "i" },
//             },
//         };
//         let aggregationPipeline = [
//             { $sort: { createdAt: -1 } },
//             { $skip: skip },
//             { $limit: limit },
//         ];

//         if (tags) {
//             aggregationPipeline.unshift(tagsMemes);
//         }
//         if (category) {
//             aggregationPipeline.unshift(categoryMemes);
//         }
//         console.log("aggregationPipeline", aggregationPipeline);
//         const memes = await Meme.aggregate(aggregationPipeline);

//         const countPipeline = [];
//         if (tags) {
//             countPipeline.push(tagsMemes);
//         }
//         if (category) {
//             countPipeline.push(categoryMemes);
//         }
//         countPipeline.push({ $count: "total" });
//         const countResult = await Meme.aggregate(countPipeline);
//         const totalRecords = countResult.length > 0 ? countResult[0].total : 0;
//         const totalPages = Math.ceil(totalRecords / limit);


//         return {
//             memes,
//             totalRecords,
//             totalPages,
//         };
//     } catch (error) {
//         console.log(error?.message);
//         throw new Error("Error fetching memes");
//     }
// };
const getAllMemes = async (tags, skip, limit, category) => {
    const searchTags = tags?.split(",").map(tag => tag.trim()).filter(Boolean) || [];
    skip = Number(skip) || 0;
    limit = Number(limit) || 10;

    try {
        const matchConditions = [];

        if (searchTags.length) {
            matchConditions.push({
                $or: searchTags.map(tag => ({
                    tags: { $elemMatch: { $regex: tag, $options: "i" } },
                })),
            });
        }

        if (category) {
            matchConditions.push({
                category: { $regex: category, $options: "i" },
            });
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

        const countPipeline = [
            { $match: matchConditions.length ? { $or: matchConditions } : {} },
            { $count: "total" },
        ];

        const countResult = await Meme.aggregate(countPipeline);
        const totalRecords = countResult.length > 0 ? countResult[0].total : 0;
        const totalPages = Math.ceil(totalRecords / limit);
        console.log(totalRecords);
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








module.exports = {
    getAllMemes,
    createMemeServ
};
