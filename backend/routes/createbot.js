const express=require("express")
const { createBot }=require("./controller/createbotController")
const router=express.Router()

router.get("/createbot",createBot)

module.exports={
    router
}