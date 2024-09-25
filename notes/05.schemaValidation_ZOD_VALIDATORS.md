# schema validation

### first we need validator npm package
```bash
npm i validator
```

### then we need to use validator in db or simple js file for validatig anything
   - it is an object over which there are many properties like validatinng email,triming,checking strong password etc

```javascript
   // models/User.js
const mongoose = require('mongoose');
const validator = require("validator");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:1,
        maxLength:50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validator(value){
            if(validator.isEmail(value)){
                throw new Error("email is not correct format")
            }
        }
    },
    password: {
        type: String,
        required: true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                    throw new Error("password is not correct");
            }
        }
    },
    age:{
        type : Number,
        required:true,
        min:18
    },
    skills :{
        type :[String]    // type is array of string
    },
    profilePic : {
       type: String,
       default: "https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
       validator(value){
        if(!validator.isURL(value)){
            throw new Error("url of profile pic is wrong");
        }
       }
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other'], // Define enum options
        required: true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // }
},{
    timestamps:true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
```

### now use zod for checking incoming body data 
  - zod is also and object
      -- the very first thing is to install zod

 ```bash
npm i zod
  ```     

 - now use zod.object to create scheme
 -then use zod.parse(req.body) to check through schema

```javascript
// validations/userValidation.js
const { z } = require('zod');

const userSchema = z.object({
    firstName: z.string().min(1).max(50),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8), // Adjust minimum length as necessary
    age: z.number().min(18),
    skills: z.array(z.string()).optional(),
    profilePic: z.string().url().optional(),
    gender: z.enum(['male', 'female', 'non-binary', 'other']),
});

const userUpdateSchema = z.object({
    email: z.string().email(),
    updates: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        age: z.number().min(18).optional(),
        gender: z.enum(['male', 'female', 'non-binary', 'other']).optional(),
    }),
});

module.exports = { userSchema, userUpdateSchema };

```

 ```javascript
 const express = require("express");
const { z } = require('zod');
const { connectDB } = require("./DataBase/db.js");
const bcrypt = require("bcrypt");
const User = require("./models/User.js");
const { userSchema, userUpdateSchema } = require("./validations/userValidation");

const app = express();
const port = 7777;

// Middleware to parse JSON bodies
app.use(express.json());

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
```