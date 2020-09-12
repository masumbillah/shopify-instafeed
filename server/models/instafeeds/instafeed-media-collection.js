const mongoose = require("mongoose");
const InstafeedSchema = require("./instafeed-media-schema");
const InstafeedsCollection = mongoose.model("instafeeds", InstafeedSchema);

module.exports = InstafeedsCollection ;