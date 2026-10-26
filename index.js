const express = require("express");
const connectDB = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./src/models/user");
console.log("rajesh server", PORT);
app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body); // Log the request body for debugging
  // Handle signup logic here
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
  });
  await user.save();
  res.send("User signed up successfully");
});
// Get all users
app.get("/user", async (req, res) => {
  const userEmail = "rajesh.coer@gmail.com";
  try {
    const users = await User.find({ email: userEmail }); // Exclude the current user from the feed
    if (users.length === 0) {
      return res.status(404).send("No users found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Error fetching users");
  }
});

//Update user profile
app.patch("/user", async (req, res) => {
  const userId = req.body.userId; // Assuming userId is sent in the request body
  console.log("Updating user with ID:", userId);
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after", // Return the updated document
    });
    res.send("User profile updated successfully");
  } catch (error) {
    res.status(400).send("Error updating user profile");
  }
});
//Feed
app.get("/feed", async (req, res) => {
  try {
    const USERS = await User.find({});
    res.send(USERS);
  } catch (error) {
    res.status(400).send("Error fetching feed");
  }
});
// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
  });

// Middleware and routes can be added here
