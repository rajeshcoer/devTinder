const validator = require("validator");

const validateSignupData = (req) => {
    const { firstName, lastName, email, password, age, gender } = req.body;
    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    } else if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol");
    }
}

module.exports = {
    validateSignupData
};