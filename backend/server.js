const express=require("express") 
const createbotroute=require("./routes/createbot")
const port = 5000;
const app=express() 

app.use(express.json())
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


app.use(createbotroute)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });