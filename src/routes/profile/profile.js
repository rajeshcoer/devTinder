
const profileRoutes = express.Router();

//Update user profile
profileRoutes.patch("/user", async (req, res) => {
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

module.exports = profileRoutes;
