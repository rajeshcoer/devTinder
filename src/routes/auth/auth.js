const express = require("express");
const User = require("../../models/user");

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  try {
   // validateSignupData(req);
  } catch (error) {
    return res.status(400).send(error.message);
  }

  // Handle signup logic here
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    skills: req.body.skills || [], // Default to an empty array if skills are not provided
  });
  await user.save();
  res.send("User signed up successfully");
});

module.exports = authRoutes;
