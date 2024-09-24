# Express.js Example

This example demonstrates how to set up a simple Express.js server with various routes for handling GET and POST requests.

```javascript
const express = require('express');
const app = express();

const port = 7777;

// Middleware to parse JSON bodies (enable us to access body as for post req)
app.use(express.json()); 

// GET request to retrieve IP address and other details
app.get('/getIP', (req, res) => {
    console.log(req.ip);             // Log the client's IP address
    console.dir(req.path);           // Log the request path
    console.dir(req.protocol);       // Log the request protocol (http or https)
    console.log(req.url);            // Log the full URL requested
    res.send("Done with IP");
});

// GET request to retrieve user details from query parameters
app.get('/user', (req, res) => {
    const fname = req.query.firstName; 
    const lname = req.query.lastName;   

    res.json({
        firstName: fname,  
        lastName: lname    
    });
});

// POST request to create a new user
app.post("/user", (req, res) => {
    const fname = req.body.firstName; 
    const lname = req.body.lastName; 
    
    res.status(200).json({
        msg: `Everything is working fine ${fname} ${lname}`
    });
});

// GET request to retrieve user details from URL parameters
app.get("/user/:id/:name", (req, res) => {
    const userId = req.params.id;        // Extract the 'id' parameter
    const userName = req.params.name;    // Extract the 'name' parameter

    res.status(200).json({
        message: `User ID is ${userId} and User Name is ${userName}`
    });
});

// Test route to check server response
app.use('/test', (req, res) => {
    res.json({
        msg: "I am a test route"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
