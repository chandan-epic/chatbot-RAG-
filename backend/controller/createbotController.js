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
You are an AI assistant in the domian of {domain} with access to a database of information. Answer the following question using the most relevant information from given context.
give {nooflines} lines answers only
description about your domain is {desc}
Question: {question}
Context from retrieved documents:
{retrievedDocs}
strictly follow these cautions: {cautions}
Answer:
`;


    // Function to send a message
    

async function createBot(req,res){
    let nolines;
    if(req.body.size==="small"){
        nolines=1
    }else if(req.body.size==="medium"){
        nolines=2
    }
    else{
        nolines=3
    }
    const prompt = promptTemplate.replace('{domain}', req.body.domain).replace('{nooflines}',nolines).replace('{desc}',req.body.desc).replace('{cautions}',req.body.caution);
    console.log(prompt)
    // const sendEvent = (data) => {
    //     res.write(`data: ${JSON.stringify(data)}\n\n`);
    // };
    //  if (!req.file) {
    //      return res.status(400).json({ message: 'No file uploaded' });
    //  }
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');

    //  const file_ext=path.extname(req.file.originalname);
    //  sendEvent("file uploaded")
    //  console.log(req.body.api);
    // //  console.log(file_ext);
    //  await uploadIntoVectorDb(pc,model,req.file.buffer,"user5","pinecone-chatbot1",file_ext);
    //  sendEvent("data processed sucessfully")
    //  const ip=await createcontainer("manohar",req.body.api,"a787ff1d-2c58-41dd-991e-76101e91afc4","user5",promptTemplate);
    //  sendEvent("container created")
    //  sendEvent(ip)
    //  res.end();

     console.log(req.body);

    // res.json({message:"sucess"});
}

module.exports={
    createBot
}

