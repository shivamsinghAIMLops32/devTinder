const express = require("express");
const app = express();

const port = 7777;

app.get("/user",(req,res)=>{
   throw new Error("an random error");
  res.send("user data is sent");
});

app.use("/",(err,req,res,next)=>{
       if(err){
        console.log(err);
        res.status(500).json({
          msg:"something went wrong"
        })
       }
       else{
        next();
       }
})

app.listen(port,()=>{
  console.log(`port is listening at ${port}`);
})