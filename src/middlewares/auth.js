const adminAuth = async (req,res,next)=>{
    console.log("Admin is getting checked");

    const token = "password from db";

    const isAdminAuthorized = token === "password from db";

    if(!isAdminAuthorized){
        res.status(401).json({
            msg: "user is not authorized"
        })
    }else{
        next();
    }

};

const userAuth = async (req,res,next)=>{
    console.log("user is getting checked");

    const token = "password from db";

    const isAdminAuthorized = token === "password from db";

    if(!isAdminAuthorized){
        res.status(401).json({
            msg: "user is not authorized"
        })
    }else{
        next();
    }

};

module.exports = {
    adminAuth,
    userAuth
}