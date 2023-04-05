const express = require("express");
const router = express.Router();

router.post("/displayfooddata", (req, res) => {
  try {
    res.send([global.food_items]);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
