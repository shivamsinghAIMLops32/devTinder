# how to send html as response with styling which is known as server side rendering

1. ** here's the code** :
```javascript
const express = require("express");
const app = express();

const port = 7777;

app.use(express.json());

// GET request to retrieve user details and send an image tag
app.get('/user', (req, res) => {
  const fname = req.query.firstName || "Guest"; 
  const lname = req.query.lastName || "User";   

  // HTML response with an image tag and background color
  res.send(`
      <body style="background-color: black;">
          <h1 style="color: white;">Hello, ${fname} ${lname}!</h1>
          <img 
              style="width: 800px; height: 700px;" 
              src="https://images.pexels.com/photos/27791471/pexels-photo-27791471/free-photo-of-a-lone-animal-in-the-grassy-field.jpeg" 
              alt="Placeholder Image" 
          />
      </body>
  `);
});


app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
```