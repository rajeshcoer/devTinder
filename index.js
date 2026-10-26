const express = require('express');
const connectDB = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;
const User = require('./src/models/user');
console.log('rajesh server',PORT);
app.use(express.json()); // Middleware to parse JSON request bodies

app.post('/signup', async(req, res) => {
    console.log('Signup request received:', req.body); // Log the request body for debugging
    // Handle signup logic here
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender
    });
    await user.save();
    res.send('User signed up successfully');
});
app.post('/login', async(req, res) => {
    console.log('Login request received:', req.body); // Log the request body for debugging
    // Handle login logic here
    const user = new User({
        email: req.body.email,
        password: req.body.password,
      
    });
    await user.save();
    res.send('User logged in successfully');
});
// Connect to MongoDB
connectDB()
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server after successful database connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with an error code
    });

// Middleware and routes can be added here