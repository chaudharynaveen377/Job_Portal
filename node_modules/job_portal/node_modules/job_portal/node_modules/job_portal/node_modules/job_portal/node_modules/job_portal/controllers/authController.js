import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export default async function registerController(req, res, next) {
    try {
        const { name, email, password } = req.body;

        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!email) return res.status(400).json({ error: "Email is required" });
        if (!password) return res.status(400).json({ error: "Password is required" });

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered, please login" });
        }

        // 🔹 Fix: Use `password`, not `this.password`
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with hashed password
        const user = await userModel.create({ name, email, password: hashedPassword });

        // Generate token
        const token = user.createJWT();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
            password:user.password,
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
}
