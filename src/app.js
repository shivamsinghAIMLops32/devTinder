const express = require('express');
const app = express();

const port = 7777;

app.use('/py',(req, res)=>{
  res.json({
    msg:"i am home"
  });
})

app.use('/test',(req, res)=>{
  res.json({
    msg:"i am test route"
  });
})

app.listen(port,()=>{
  console.log(`server is listening on ${port}`);
});