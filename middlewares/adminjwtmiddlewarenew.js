const jwt = require("jsonwebtoken")

const adminjwtmiddlewarenew = (req,res,next) =>{
    console.log("inside jwt middlware");
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);

  try 
    { 
    const jwtresponse = jwt.verify(token, process.env.JWTsecretkey)
    console.log(jwtresponse);
    req.payload = jwtresponse.usermail
    req.role = jwtresponse.role
    if(jwtresponse.role == "admin"){
            next()
    }else{
        res.status(401).json(`Unauthorized user`)
    }
     
   
   } catch (err) {
    res.status(500).json("invalid token",err)
   }
    

}

module.exports = adminjwtmiddlewarenew