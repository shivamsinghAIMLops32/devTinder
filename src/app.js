const express = require("express");
const app = express();

const port = 7777;

app.listen(port,()=>{
  console.log(`port is listening at ${port}`);
})