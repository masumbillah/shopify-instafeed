const mongoose = require("mongoose");
const SettingsSchema = require("./instafeeds-schema");

const SettingsCollection = mongoose.model("settings", SettingsSchema);


SettingsCollection.after.insert = function (doc){
    console.log("insert after hooks", doc);
}

module.exports = SettingsCollection;