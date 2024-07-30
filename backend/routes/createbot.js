const express=require("express")
const { createBot }=require("../controller/createbotController")
const multer=require("multer")
const router=express.Router()



const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/createbot",upload.single('file'),createBot);

module.exports=router;


