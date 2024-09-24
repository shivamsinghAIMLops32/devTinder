const express = require('express');
const app = express();

const port = 7777;

app.get('/user', (req, res) => {
  const fname = req.query.firstName; 
  const lname = req.query.lastName;   

  res.json({
    firstName: fname,  
    lastName: lname    
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