const mongoose = require('mongoose');
const Meme = require('../models/memeModel');



const createMemeServ = async (obj) => {
    try {
        return await Meme.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}


const getAllMemes = async (tags, skip, limit) => {

    const searchTags = tags.split(",").map(tag => {
        if (tag) {
            return tag.trim()
        }
    });

    console.log("searched tags:", searchTags)
    skip = Number(skip);
    try {

        //     $match: {
        //         tags: {
        //             $elemMatch: {
        //                 $regex: tags,
        //                 $options: "i",
        //             },
        //         },
        //     },
        // };
        const tagsMemes = {
            $match: {
                $or: searchTags.map(tag => ({
                    tags: { $elemMatch: { $regex: tag, $options: "i" } },
                })),
            },
        };
        let aggregationPipeline = [
            { $sort: { createdAt: -1 } },
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
    getAllMemes,
    createMemeServ
};
