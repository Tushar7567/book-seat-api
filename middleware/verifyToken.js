const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

require("dotenv").config({ path: "./.env" });

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.cookie;
    console.log(authHeader);
    if (authHeader) {
      const token = authHeader.replace("jwtoken=", "");
      console.log(token);
      const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    
        if (!verifyToken) {
          res.status(403).json("Token is not valid!");
        }
        req.user_id = verifyToken._id;
        console.log('token verified');
        next();
      
    } else {
      return res.status(401).json("You are not authenticated!");
    }
};

// const authorizeAdmin = (req, res, next) => {
//     authenticate(req, res, () => {
//       // console.log(req.data);
//       if (req.user.isAdmin) {
//         next();
//       } else {
//         res.status(403).json("You are not alowed to do that!");
//       }
//     });
//   };

module.exports = {authenticate};
