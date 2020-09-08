const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    storeId: {
        type: String,
    },
    type: {
        type: String,
        optional: true
    },
    collumnNumbers: {
        type: Number,
        optional: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
});

module.exports = SettingsSchema;