const mongoose = require("mongoose");
const InstafeedSchema = require("./instafeeds-schema");

const InstafeedsCollection = mongoose.model("instafeeds", InstafeedSchema);

console.log("01.5555", InstafeedsCollection);

InstafeedSchema.pre('save', function(doc, next) {
    console.log('Pre', doc);
    doc._id = "asdfasdfasdfasdfasdf"
    next();
  });

InstafeedSchema.post('save', function(doc, next) {
    console.log('post2', doc);
    next();
  });

module.exports = InstafeedsCollection;