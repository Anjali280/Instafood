const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    await User.create(user);
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
