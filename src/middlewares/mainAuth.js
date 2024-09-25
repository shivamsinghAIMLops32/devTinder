const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

// db
const User = require("src.\Database\db.js");

const userAuth = async (res,req,next) =>{
 try{
    // create the token from req
    const cookies = req.cookies;
    const {token} = cookies;
    
    const decodedObject = await jwt.verify(token,"DEV@Tinnder$790");
    const {_id} = decodedObject;
    // validate the user
    // find the user
    next();
 }catch(err){
    res.send("error :"+err);
 }
}

modoule.export = {userAuth};