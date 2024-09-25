const express = require("express");
const { z } = require('zod');
const { connectDB } = require("./DataBase/db.js");
const bcrypt = require("bcrypt");
const User = require("./models/User.js");
const { userSchema, userUpdateSchema } = require("./validations/userValidation");

const cookieParser = require("cookie-parser");
const app = express();
const port = 7777;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.get("/login",(req,res)=>{
    res.cookie("token","jbwfuh39290343u2ubcuhe");
    res.send("user logged in successfully");
})

app.get("/getUser",(req,res)=>{
    const cookie = req.cookies;
    console.log(cookie);
    res.send("cookie has been sent for getUser route");
})

// Route to create a new user
app.post("/user", async (req, res) => {
    try {
        const validatedData = userSchema.parse(req.body);

        const newUser = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            password: await bcrypt.hash(validatedData.password, 10),
        });

        await newUser.save(); // Save the new user to the database
        res.status(201).json({ msg: "User created successfully" });
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(400).json({ msg: err.errors || "Invalid input data" });
    }
});

// Route to fetch a user by email
app.get("/user", async (req, res) => {
    const givenEmail = req.query.email;

    // Check if the email query parameter is provided
    if (!givenEmail) {
        return res.status(400).json({ msg: "Email query parameter is required" });
    }

    try {
        const user = await User.findOne({ email: givenEmail });

        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist" });
        }

        const { password, createdAt, ...userObjData } = user.toObject();
        res.json(userObjData);
    } catch (err) {
        console.error("Some error occurred:", err);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Route to update user information
app.patch("/user", async (req, res) => {
    try {
        const validatedData = userUpdateSchema.parse(req.body);

        const user = await User.findOneAndUpdate(
            { email: validatedData.email },
            validatedData.updates,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist" });
        }

        const { password, ...userData } = user.toObject();
        res.json(userData);
    } catch (err) {
        console.error("An error occurred:", err);
        res.status(400).json({ msg: err.errors || "Invalid input data" });
    }
});

// Other routes remain the same...

// Connect to the database and start the server
connectDB()
    .then(() => {
        console.log("Connected to database");
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
