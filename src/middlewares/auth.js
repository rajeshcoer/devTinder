const adminAuth = (req, res, next) => {
console.log("Admin auth middleware called");
const token = 'xyzddfdf'
const isAdinAuthorized = token === 'xyz'; // Replace with your actual admin authorization logic
if (!isAdinAuthorized) {
    return res.status(403).send("Access denied. Admins only."); 
} else {
    next(); // Proceed to the next middleware or route handler  
}
};

module.exports =  { adminAuth}