const express = require("express");
const bcrypt = require("bcryptjs");
const { createUser } = require("../models/userModel");
const router = express.Router();
const passport = require("passport");
const { loginUser } = require("../models/userModel");


router.post("/register", async (req, res) => {
    const { username, fullName, email, password, dateOfBirth } = req.body;
    try {
      const newUser = await createUser(username, fullName, email, password, dateOfBirth);
      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.message === "Email in use") {
        res.status(409).json({ message: "Email already in use" });
      } else {
        res.status(500).json({ message: "Error registering new user." });
      }
    }
  });
  

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).json({ message: error.message });
    }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

router.get("/apple", passport.authenticate("apple"));

router.get("/apple/redirect", passport.authenticate("apple"), (req, res) => {
  res.redirect("/dashboard");
});

module.exports = router;
