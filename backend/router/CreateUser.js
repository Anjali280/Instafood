const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

/*validaotor is mainly for the validation of name , email and password */
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const user = req.body;
      await User.create(user);
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

//For LOGIN
router.post(
  "/loginuser",
  [
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }

      if (req.body.password !== user.password) {
        return res
          .status(400)
          .json({ success, error: "Try Logging in with correct credentials" });
      }

      return res.json({ success: true });

      // const pwdCompare = await bcrypt.compare(password, user.password);
      // if (!pwdCompare) {
      //   return res
      //     .status(400)
      //     .json({ success, error: "Try Logging in with correct credentials" });
      // }
      // const data = {
      //   user: {
      //     id: user.id,
      //   },
      // };
      // success = true;
      // const authToken = jwt.sign(data, jwtSecret);
      // res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.send("Server Error");
    }
  }

  // try {
  //   const user = req.body;
  //   await User.create(user);
  //   res.json({ success: true });
  // } catch (err) {
  //   console.log(err);
  //   res.json({ success: false });
  // }
);

module.exports = router;
