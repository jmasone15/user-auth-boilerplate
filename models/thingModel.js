const mongoose = require("mongoose");
const thingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, required: true },
});

const Thing = mongoose.model("thing", thingSchema);
module.exports = Thing;