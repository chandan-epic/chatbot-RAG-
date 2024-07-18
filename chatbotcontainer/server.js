const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pinecone }=require('@pinecone-database/pinecone');

const express = require('express');
const bodyParser = require('body-parser');
const {getResponseFromGemini}=require("./chatbot")
const app = express();
const port = 3000;

const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");
const pc = new Pinecone({
    apiKey: 'a787ff1d-2c58-41dd-991e-76101e91afc4'
});
const modeltxt = genAI.getGenerativeModel({ model: "gemini-1.5-flash"}); 
const modelEmbeded = genAI.getGenerativeModel({ model: "text-embedding-004" });


const promptTemplate = `
You are an AI assistant with access to a vast database of information. Answer the following question using the most relevant information from your database.
give single line answers only
Question: {question}
Context from retrieved documents:
{retrievedDocs}
Answer:
`;
app.get('/answer', async (req, res) => {
  
  result=await getResponseFromGemini("hai.....",modelEmbeded,promptTemplate,modeltxt,pc)
  console.log(result)
  return res.status(200).json({ message: 'Data received successfully', receivedData:result})
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});