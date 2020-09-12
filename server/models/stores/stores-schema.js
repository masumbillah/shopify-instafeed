const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    name: {
        type: String,
        optional: true
    },
    status: {
        type: String,
        optional: true
    },
    plan: {
        type: String,
        optional: true
    },
    created_at: { 
        type: Date, 
        default: Date.now
    },
});

StoreSchema.pre('save', ()=> {
  console.log('Pre data');

});

StoreSchema.post('save', (doc)=> {
  console.log("Post data", doc._id);
  
});

module.exports = StoreSchema;