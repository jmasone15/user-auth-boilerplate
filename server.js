const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Runs functions for incoming requests for all paths or specific requests 
app.use(express.json());
app.use(cookieParser());

// Database Connection
// Make sure to put the db name here.
mongoose.connect("mongodb://localhost/mernUserAuth", {
    useNewUrlParser: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

// Routes
app.use("/auth", require("./routes/userRoutes"));
app.use("/thing", require("./routes/thingRoutes"));


// Starts the server.
app.listen(PORT, () => console.log(`Running on port: ${PORT}🌎`));