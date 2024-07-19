const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pinecone }=require('@pinecone-database/pinecone');
const fetch = require('node-fetch');
global.fetch = fetch;
const express = require('express');
const bodyParser = require('body-parser');
const {getResponseFromGemini}=require("./chatbot")
const dotenv = require('dotenv');
//dotenv.config();
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API
});
const modeltxt = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}); 
const modelEmbeded = genAI.getGenerativeModel({ model: "text-embedding-004" });


const promptTemplate = `
You are an AI assistant with access to a vast database of information. Answer the following question using the most relevant information from your database.
,give one line answers only
Question: {question}
Context from retrieved documents:
{retrievedDocs}
Answer:
`;

app.use(bodyParser.json());
app.get('/answer', async (req, res) => {
  const data=req.body
  console.log(data.question)
  const result=await getResponseFromGemini(data.question,modelEmbeded,promptTemplate,modeltxt,pc)
  console.log(result)
  return res.status(200).json({ message: 'Data received successfully', receivedData:result})
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});