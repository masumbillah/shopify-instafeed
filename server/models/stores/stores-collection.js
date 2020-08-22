const mongoose = require("mongoose");
import StoreSchema from "./stores-schema";

const StoresCollection = mongoose.model("stores", StoreSchema);

module.exports = StoresCollection;