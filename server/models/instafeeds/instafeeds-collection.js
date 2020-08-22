const mongoose = require("mongoose");
import InstafeedSchema from "./instafeeds-schema";

const InstafeedsCollection = mongoose.model("instafeeds", InstafeedSchema);


InstafeedsCollection.after.insert = function (doc){
    console.log("insert after hooks", doc);
}

module.exports = InstafeedsCollection;