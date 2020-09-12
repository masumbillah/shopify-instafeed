const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    store_id: {
        type: String,
    },
    type: {
        type: String,
        optional: true
    },
    feed_title: {
        type: String,
        optional: true
    },
    post_space: {
        type: Number,
        optional: true
    },
    on_post_click: {
        type: String,
        optional: true
    },
    number_columns: {
        type: Number,
        optional: true
    },
    number_rows: {
        type: Number,
        optional: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
});

SettingsSchema.pre('save', ()=> {
  console.log('Pre data');

});

SettingsSchema.post('save', (doc)=> {
  console.log("Post data", doc._id);
  
});

module.exports = SettingsSchema;