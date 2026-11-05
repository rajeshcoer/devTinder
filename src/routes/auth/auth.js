const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { adminAuth } = require("../../middlewares/auth");

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    // validateSignupData(req);
    const { password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    // Handle signup logic here
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      age: req.body.age,
      gender: req.body.gender,
      skills: req.body.skills || [], // Default to an empty array if skills are not provided
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    res.send("User logged in successfully");
  } catch (error) {
    res.status(500).send("Error logging in user");
  }
});

module.exports = authRoutes;
