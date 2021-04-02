const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Runs functions for incoming requests for all paths or specific requests 
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny")); // logging framework

// Starts the server.
app.listen(PORT, () => console.log(`Running on port: ${PORT}🌎`));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Database Connection
// Make sure to put the db name here.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mernUserAuth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
});

// Routes
app.use("/auth", require("./routes/userRoutes"));
app.use("/thing", require("./routes/thingRoutes"));
// Only use for heroku
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});