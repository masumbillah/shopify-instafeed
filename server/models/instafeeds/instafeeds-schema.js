const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstafeedSchema = new Schema({
    name: {
        type: String,
        optional: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    },
});

module.exports = InstafeedSchema;