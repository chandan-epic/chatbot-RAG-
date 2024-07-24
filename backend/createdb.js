const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const PDFParser = require("pdf-parse");
const { Pinecone }=require('@pinecone-database/pinecone');
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

// async function extractTextFromPDF(pdfData) {
   
//     return data.text;
// }

async function splitTextIntoChunks(text) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 700, 
        chunkOverlap: 100, 
    });

    const chunks = await splitter.splitText(text);
    return chunks;
}

async function storeEmbeddingsInPinecone(pineconeApi,namespace,embeddings,chunks,dbname) {
    const index = pineconeApi.index(dbname);
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

async function uploadIntoVectorDb(pineconeApi,textEmbedModel,file,namespace,dbname,file_ext) {
    let Text;
    if(file_ext===".pdf"){
        Text = await PDFParser(file);
    }else if(file_ext===".txt"){
        Text= file.toString("utf8");
    }

    const chunks =await splitTextIntoChunks(Text.text);
    const allEmbeddings = [];
    for (let chunk of chunks) {
        const result = await textEmbedModel.embedContent(chunk);
        const embedding = result.embedding;
        allEmbeddings.push(embedding.values); 
    }
    
    await storeEmbeddingsInPinecone(pineconeApi,namespace,allEmbeddings,chunks,dbname);
    console.log("All embeddings stored in Pinecone.");
}


const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });


const delete_data=()=>{
    const pc =new Pinecone({
        apiKey: 'a787ff1d-2c58-41dd-991e-76101e91afc4'
    });
    // const pdfFilePath = "./inputdata/OOSE.pdf";
    // namespace="user1"
    const index = pc.index('pinecone-chatbot1');
    index.deleteAll()
}

//uploadIntoVectorDb(pc,model,pdfFilePath,namespace)
module.exports={
    uploadIntoVectorDb
}

// delete_data();
