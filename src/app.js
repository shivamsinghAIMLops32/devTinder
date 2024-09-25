const express = require("express");
const app = express();

const port = 7777;
const {adminAuth,userAuth} = require("./middlewares/auth.js");

// handle auth middleware for all admin request
app.use("/admin",adminAuth);
app.use("/user",userAuth);

// routes
app.get("/admin",(req,res)=>{
     res.send("admin data is sent");
});

app.get("/admin/getAllData",(req,res)=>{
  res.send("admin all data has been sent");
});

app.get("/user",(req,res)=>{
  res.send("user data is sent");
});

app.listen(port,()=>{
  console.log(`port is listening at ${port}`);
})