const {uploadIntoVectorDb}=require("../createdb");
const { Pinecone }=require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createcontainer  }=require('../aws_ecs/ecsconnection');

const {insertContainerData}=require('../Db/crud')
const path=require("path");
const client=require("../Db/dbconnection")


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
const pc =new Pinecone({
    apiKey:process.env.PINECONE_API,
});

namespace="user1";

const promptTemplate = `
You are an AI assistant in the domian of {domain} . Answer the following question using the most relevant information from given info.
keep the answer precise with {nooflines} lines \n
description of info is: {desc}
info:
{retrievedDocs}
Question: {question}\n
follow these cautions: {cautions}
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
    const prompt = promptTemplate.replace('{domain}', req.body.domain).replace('{nooflines}',nolines).replace('{desc}',`{${req.body.desc}}\n`).replace('{cautions}',`{${req.body.caution}}`);
    console.log(prompt)


    // const sendEvent = (data) => {
    //     res.write(`data: ${JSON.stringify(data)}\n\n`);
    // };
     if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
     }

     const file_ext=path.extname(req.file.originalname);
     
     console.log(req.body.api);
     const cont_id=`user${Math.random()*1000}`
     await uploadIntoVectorDb(pc,model,req.file.buffer,cont_id,"pinecone-chatbot1",file_ext);

     const {ip,taskarn}=await createcontainer("manohar",req.body.apiKey,process.env.PINECONE_API,cont_id,prompt);


     console.log(ip);
    const username="manohar"
    const containerDetails={
        username:username,
        ip:ip,
        taskarn:taskarn,
        domain:req.body.domain,
        desc:req.body.desc,
        size:req.body.size,
        cautions:req.body.caution,
        chatbotname:req.body.botname,
        apikey:req.body.apiKey,
        cont_id:cont_id
    }
    insertContainerData(client,containerDetails)
    res.json({message:"sucess"});
}

module.exports={
    createBot
}

