const dotenv = require('dotenv');
dotenv.config();

const express=require("express");
const createbotroute=require("./routes/createbot")

const port = 3000;
const app=express() 

app.use(express.json())
app.use("/",createbotroute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });