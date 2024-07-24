const {uploadIntoVectorDb}=require("../createdb");
const { Pinecone }=require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createcontainer  }=require('../aws_ecs/ecsconnection');
const path=require("path");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const pc =new Pinecone({
    apiKey:process.env.PINECONE_API,
});
namespace="user1";

const promptTemplate = `
You are an AI assistant with access to a vast database of information. Answer the following question using the most relevant information from your database.
give single line answers only
Question: {question}
Context from retrieved documents:
{retrievedDocs}
Answer:
`;

async function createBot(req,res){
     
     if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
     }

     const file_ext=path.extname(req.file.originalname);
     console.log(req.body.api);
    //  console.log(file_ext);
    await uploadIntoVectorDb(pc,model,req.file.buffer,"user5","pinecone-chatbot1",file_ext);

     const ip=await createcontainer("manohar",req.body.api,"a787ff1d-2c58-41dd-991e-76101e91afc4","user5",promptTemplate);
     console.log("container running:",ip);

    res.json({message:"sucess"});
}

module.exports={
    createBot
}

