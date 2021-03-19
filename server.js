const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Database Connection
// Make sure to put the db name here.
mongoose.connect("mongodb://localhost/mernUserAuth", {
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

// Starts the server.
app.listen(PORT, () => console.log(`Running on port: ${PORT}🌎`));