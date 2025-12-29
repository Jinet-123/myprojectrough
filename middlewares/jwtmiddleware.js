const jwt = require("jsonwebtoken")

const jwtmiddleware = (req,res,next) =>{
    console.log("inside jwt middlware");
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

  try 
    { const jwtresponse = jwt.verify(token, process.env.JWTsecretkey)
    console.log(jwtresponse);
    req.payload = jwtresponse.usermail
     next()
    // console.log(req.payload);
   } catch (err) {
    res.status(500).json("invalid token",err)
   }
    

}

module.exports = jwtmiddleware