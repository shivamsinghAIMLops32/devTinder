const express = require('express');
const app = express();

const port = 7777;

app.use(express.json()); 

app.get('/user', (req, res) => {
  const fname = req.query.firstName; 
  const lname = req.query.lastName;   

  res.json({
    firstName: fname,  
    lastName: lname    
  });
});

app.post("/user",(req,res)=>{
  const fname = req.body.firstName; 
  const lname = req.body.lastName; 
  
  res.status(200).json({
    msg : `every thing is working fine ${fname} ${lname}`
  })
})


app.get("/user/:id/:name", (req, res) => {
  // Extract the 'id' parameter from the request
  const userId = req.params.id;
  const userName= req.params.name;

  res.status(200).json({
    message: `User ID is ${userId} and userName is ${userName}`
  });
});

app.use('/test',(req, res)=>{
  res.json({
    msg:"i am test route"
  });
})

app.listen(port,()=>{
  console.log(`server is listening on ${port}`);
});