const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const express=require("express");
const createbotroute=require("./routes/createbot")
const displaybot=require("./routes/displaybots")
const port = 3000;
const app=express() 

app.use(cors({
  origin: 'http://localhost:5173', // URL of your React frontend
  credentials: true
}));

app.use(express.json())
app.use("/",createbotroute)
app.use("/",displaybot)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });



