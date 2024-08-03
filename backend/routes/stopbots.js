const express=require("express")
const stopbot=require("../controller/stopbotController")
const router=express.Router()

router.post("/stopbot",stopbot);

module.exports=router;





