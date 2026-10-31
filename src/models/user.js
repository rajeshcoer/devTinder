const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: "String", required: true, minLength : 2, maxLength : 30 },
    lastName: { type: "String", required: true },
    email: {
      type: "String",
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: "String", required: true },
    age: { type: Number, min: 18},
    gender: { type: "String" ,
        validate(value) {
            const allowedGenders = ["Male", "Female", "Other"];
          if(!allowedGenders.includes(value)){
            throw new Error("Gender must be either Male, Female, or Other");
          }
        }

    },
    photoUrl: {
      type: "String",
      default:
        "https://www.singaporebusinesscentre.com.sg/wp-content/uploads/2016/12/singapore-business-centre-team-placeholder-t2.png",
    },
    about: { type: "String", default: "Default about text" },
    skills: { type: [String] },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
