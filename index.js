const express = require("express");
const connectDB = require("./src/config/database");

const app = express();
const PORT = process.env.PORT || 3000;
const User = require("./src/models/user");
console.log("rajesh server", PORT);
app.use(express.json()); // Middleware to parse JSON request bodies

const authRoutes = require("./src/routes/auth/auth");
app.use("/", authRoutes);
// Get all users
app.get("/user", async (req, res) => {
  const userEmail = req.query.email || "rajesh.coer@gmail.com";
  try {
    const users = await User.findOne({ email: userEmail }).exec(); // Exclude the current user from the feed
    if (!users) {
      return res.status(404).send("User not found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Error fetching users");
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
// Delete user
app.delete("/user", async (req, res) => {
    const userId = '6adeffa885cde603bfd4413a'; // Assuming userId is sent in the request body
    try{
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send("User deleted successfully");
    } catch (error) {
        res.status(400).send("Error deleting user");
    }
})
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
