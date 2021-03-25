const router = require("express").Router();
const Thing = require("../models/thingModel");
const auth = require("../middleware/auth");

// Make sure to have the auth middleware as an argument for all of these protected routes.
// The auth middleware ensures that the user is logged in before allowing them access to the protected routes of your site.
router.post("/", auth, async (req, res) => {
    try {

        const { name } = req.body;
        const newThing = new Thing({ name: name, userId: req.user });

        const savedThing = await newThing.save();
        res.json(savedThing);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/", auth, async (req, res) => {
    try {

        const things = await Thing.find({ userId: req.user });
        res.json(things);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;