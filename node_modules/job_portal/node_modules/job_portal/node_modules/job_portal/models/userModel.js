import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name Is Required"],
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email Is Required"],
            unique: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: "Invalid email format",
            },
        },
        password: {
            type: String,
            required: [true, "Password Is Required"],
        },
        location: {
            type: String,
            default: "India",
        },
    },
    { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Prevent rehashing
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// JWT Token Creation
const JWT_SECRET="2e3rf3r3g";
userSchema.methods.createJWT = function () {
    return JWT.sign(
        { userId: this._id },
        JWT_SECRET, // Use environment variable
        { expiresIn: "1d" }
    );
};

export default mongoose.model("User", userSchema);
