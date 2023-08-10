const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchUser')
require('dotenv').config();

const JWT_SECRET = "123";
//Create a User using: POST "/api/auth/" Doesnot require Auth

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 character").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //If there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check the user with same exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Email already existed" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occur");
    }
  }
);

//authenticate user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password").exists(),
  ],
  async (req, res) => {
    //If there are errors, return bad request and errors
    console.log(JWT_SECRET);
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({"auth-Token": authToken});
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occur");
    }
  }
);

//Route3: Get logged in user detail using POST . login required
router.post(
  "/getUser",fetchuser, async (req, res) => {
    try {
      let  userId = req.user.id;
      const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error1 occur");
    }
  }
);
module.exports = router;
