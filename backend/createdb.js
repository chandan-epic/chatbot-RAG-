const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const PDFParser = require("pdf-parse");
const { Pinecone }=require('@pinecone-database/pinecone');
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

async function extractTextFromPDF(pdfData) {
   
    return data.text;
}

async function splitTextIntoChunks(text) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 700, 
        chunkOverlap: 100, 
    });

    const chunks = await splitter.splitText(text);
    return chunks;
}

async function storeEmbeddingsInPinecone(pineconeApi,namespace,embeddings,chunks) {
    const index = pineconeApi.index('chatdata');
    console.log("connected to pine cone")
    for (let i = 0; i < embeddings.length; i++) {
        const embedding = embeddings[i];
        await index.namespace(namespace).upsert([{
            id: i.toString(),
            values: embedding,
            metadata:{text:chunks[i]}
        }]);
    }
}
async function uploadIntoVectorDb(pineconeApi,textEmbedModel,file,namespace) {
   
    const pdfText = await PDFParser(file);
    const chunks =await splitTextIntoChunks(pdfText.text);
    const allEmbeddings = [];
    for (let chunk of chunks) {
        const result = await textEmbedModel.embedContent(chunk);
        const embedding = result.embedding;
        allEmbeddings.push(embedding.values); 
    }
    
    await storeEmbeddingsInPinecone(pineconeApi,namespace,allEmbeddings,chunks);
    console.log("All embeddings stored in Pinecone.");
}


const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });


const delete_data=()=>{
    const pc =new Pinecone({
        apiKey: '1fa5b48d-ca36-4199-abd0-4cccd7cba4d8'
    });
    const pdfFilePath = "./inputdata/OOSE.pdf";
    namespace="user1"
    const index = pc.index('chatdata');
    index.namespace("user1").deleteAll()
}

//uploadIntoVectorDb(pc,model,pdfFilePath,namespace)
module.exports={
    uploadIntoVectorDb
}
