const express=require("express")
const { createBot }=require("../controller/createbotController")
const multer=require("multer")
const router=express.Router()

const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');

const fun=(req,res,next)=>{
    console.log('Incoming token:', req.headers.authorization);
    next();
}

// Configure JWT middleware
const checkJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-4r3rjx74qa1yojds.us.auth0.com/.well-known/jwks.json` // Replace with your Auth0 domain
  }),
  audience: 'https://dev-4r3rjx74qa1yojds.us.auth0.com/api/v2/', // Replace with your API Identifier
  issuer: `https://dev-4r3rjx74qa1yojds.us.auth0.com/`, // Replace with your Auth0 domain
  algorithms: ['RS256']
});


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/createbot",fun,checkJwt,upload.single('pdfFile'),createBot);

module.exports=router;


