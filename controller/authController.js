const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/auth"); // Corrected from Product to User

require("dotenv").config();
// Register function
exports.register = async (req, res) => {
  const { email, password, name, surname, role } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      email,
      password: hashedPassword,
      name,
      surname,
      role: role || "admin", // Set default role if not provided
    });

    // Save user to the database
    await user.save();
    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user and include the password field for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a new object without the password field
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // Prepare response with user id and redirect URL
    const redirectUrl = user.role === "admin" ? "/homepage_admin" : "/homepage";
    return res.json({
      userId: user._id, // ส่ง id ของผู้ใช้
      user: userWithoutPassword,
      redirectUrl,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// refresh
exports.refresh = async (req, res) => {
  const { token } = req.body; // Extract the token from the request body

  if (!token) {
    return res.sendStatus(401); // If no token is provided, respond with 401 Unauthorized
  }

  // Verify the refresh token using the REFRESH_TOKEN_SECRET
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Refresh token expired or invalid"); // Send 403 Forbidden if the token is invalid or expired
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: user.userId }, // Extract userId from the decoded token
      process.env.ACCESS_TOKEN_SECRET, // Use the ACCESS_TOKEN_SECRET for signing
      { expiresIn: "15m" } // Set the access token to expire in 15 minutes
    );

    // Respond with the new access token
    res.json({ accessToken });
  });
};
