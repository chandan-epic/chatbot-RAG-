const express=require("express")
const ansforQues=require("../controller/ansforQueryController")
const router=express.Router()

router.post("/stopbot",ansforQues);

module.exports=router;





