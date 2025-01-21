const mongoose = require('mongoose');
const Meme = require('../models/memeModel');





const getAllMemes = async (tags, skip, limit) => {
    console.log("skip in getAllMemes", skip);
    skip = Number(skip);
    try {
        const tagsMemes = {
            $match: {
                tags: {
                    $elemMatch: {
                        $regex: tags,
                        $options: "i",
                    },
                },
            },
        };

        let aggregationPipeline = [
            { $sort: { createdAt: -1 } }, // Sort by createdAt in descending order
            { $skip: skip },
            { $limit: limit },
        ];

        if (tags) {
            aggregationPipeline.unshift(tagsMemes);
        }
        console.log("aggregationPipeline", aggregationPipeline);
        const memes = await Meme.aggregate(aggregationPipeline);

        const countPipeline = tags ? [tagsMemes, { $count: "total" }] : [{ $count: "total" }];
        const countResult = await Meme.aggregate(countPipeline);

        const totalRecords = countResult.length > 0 ? countResult[0].total : 0;
        const totalPages = Math.ceil(totalRecords / limit);

        console.log("totalRecords", totalRecords);
        console.log("total pages", totalPages);
        return {
            memes,
            totalRecords,
            totalPages,
        };
    } catch (error) {
        console.log(error?.message);
        throw new Error("Error fetching memes");
    }
};







module.exports = {
    getAllMemes
};
