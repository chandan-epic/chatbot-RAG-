const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pinecone }=require('@pinecone-database/pinecone');
// const fetch = require('node-fetch');
// global.fetch = fetch;
const express = require('express');
const bodyParser = require('body-parser');
const {getResponseFromGemini}=require("./chatbot");
const cors=require("cors")
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3004;
app.use(cors())
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API
});

const modeltxt = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}); 
const modelEmbeded = genAI.getGenerativeModel({ model: "text-embedding-004" });

const promptTemplate = process.env.PROMPT_TEMPLATE;
const namespace=process.env.NAMESPACE;
const dbname=process.env.DB_NAME;


app.use(bodyParser.json());
app.post('/answer', async (req, res) => {
  const data=req.body
  console.log(data.question)
  const result=await getResponseFromGemini(data.question,modelEmbeded,promptTemplate,modeltxt,pc,namespace,dbname);
  return res.status(200).json({ message: 'Data received successfully', receivedData:result});
});

app.listen(port,"0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});