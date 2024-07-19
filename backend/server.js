const express=require("express") 
const createbotroute=require("./routes/createbot")

const port = 3004;
const app=express() 

app.use(express.json())
app.use("/",createbotroute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });