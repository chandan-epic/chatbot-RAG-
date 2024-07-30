const express=require("express")
const getbots=require("../controller/getbotsController")

const router=express.Router()

router.get("/getbots",getbots);

module.exports=router;

