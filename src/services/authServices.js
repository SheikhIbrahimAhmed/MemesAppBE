const User = require("../models/userModel");
const Meme = require("../models/memeModel");
const createUserServ = async (obj) => {
    try {
        return await User.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const createMemeServ = async (obj) => {
    try {
        return await Meme.create(obj);
    } catch (err) {
        console.log("err", err);
    }
}
const findSingleUserServ = async (obj) => {
    try {
        return await User.findOne(obj);
    } catch (err) {
        console.log("err", err);
    }
}

module.exports = {
    createUserServ,
    findSingleUserServ,
    createMemeServ
}