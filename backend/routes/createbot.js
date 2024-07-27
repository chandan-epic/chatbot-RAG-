const express=require("express")
const { createBot }=require("../controller/createbotController")
const multer=require("multer")
const router=express.Router()


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.get("/createbot",upload.single('pdfFile'),createBot);

module.exports=router;


