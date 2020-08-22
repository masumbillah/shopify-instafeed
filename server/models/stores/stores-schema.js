const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        optional: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
});

module.exports = StoreSchema;