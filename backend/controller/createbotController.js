const {uploadIntoVectorDb}=require("../createdb")
const { Pinecone }=require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {exec}=require('child_process');
const { createcontainer  }=require('../aws_ecs/ecsconnection');
// const Docker = require('dockerode');
// const GOOGLE_KEY="AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8"
const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");

const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
// const PINECONE_KEY='1fa5b48d-ca36-4199-abd0-4cccd7cba4d8';
const pc =new Pinecone({
    apiKey:'a787ff1d-2c58-41dd-991e-76101e91afc4'
});
// const pdfFilePath = "./inputdata/OOSE.pdf";
namespace="user1";


// const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function createBot(req,res){
     
     if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
     }
    await uploadIntoVectorDb(pc,model,req.file.buffer,"user1","pinecone-chatbot1");

    //  const cmd=`docker run -p 3009:3000 -e GEMINI_API="AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8" -e PINECONE_API="a787ff1d-2c58-41dd-991e-76101e91afc4" manohar448/bot-server2:latest`;
    //  exec(cmd);
    const promptTemplate = `
You are an AI assistant with access to a vast database of information. Answer the following question using the most relevant information from your database.
give single line answers only
Question: {question}
Context from retrieved documents:
{retrievedDocs}
Answer:
`;
     await createcontainer("manohar","AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8","a787ff1d-2c58-41dd-991e-76101e91afc4","user2",promptTemplate);
     console.log("container running");

    res.json({message:"sucess"});
}

module.exports={
    createBot
}

