const {uploadIntoVectorDb}=require("../createdb")
const { Pinecone }=require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Docker = require('dockerode');
const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");

const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const pc =new Pinecone({
    apiKey: '1fa5b48d-ca36-4199-abd0-4cccd7cba4d8'
});
const pdfFilePath = "./inputdata/OOSE.pdf";
namespace="user1"


const docker = new Docker({ socketPath: '//./pipe/docker_engine' });

async function createBot(req,res){
     
     if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
     }
    await uploadIntoVectorDb(pc,model,req.file.buffer,"user1")

    res.json({message:"sucess"})
}

module.exports={
    createBot
}