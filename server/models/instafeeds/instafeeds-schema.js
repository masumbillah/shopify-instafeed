const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstafeedSchema = new Schema({
    storeId: {
        type: String,
    },
    username: {
        type: String,
        optional: true
    },
    id: {
        type: String,
        optional: true
    },
    caption: {
        type: String,
        optional: true
    },
    media_type: {
        type: String,
        optional: true
    },
    media_url: {
        type: String,
        optional: true
    },
    permalink: {
        type: String,
        optional: true
    },
    timestamp: {
        type: String,
        optional: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
});

module.exports = InstafeedSchema;