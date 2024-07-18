const { GoogleGenerativeAI } = require("@google/generative-ai");
const PDFParser = require("pdf-parse");
const { Pinecone }=require('@pinecone-database/pinecone');
const readline = require("readline");

const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");


const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");




async function extractTextFromPDF(pdfData) {
    const data = await PDFParser(pdfData);
    return data.text;
}

async function splitTextIntoChunks(text) {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500, 
        chunkOverlap: 100, 
    });

    const chunks = await splitter.splitText(text);
    return chunks;
}

async function storeEmbeddingsInPinecone(embeddings,chunks) {
    const pc =new Pinecone({
        apiKey: 'a787ff1d-2c58-41dd-991e-76101e91afc4'
    });
    console.log("pinecone connected");
    console.log(embeddings.length,chunks.length);
    const index = pc.index('pinecone-chatbot1');

    for (let i = 0; i < embeddings.length; i++) {
        const embedding = embeddings[i];
        await index.upsert([{
            id: i.toString(),
            values: embedding

        }]);
    }
}

async function userInput(model) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Please enter your query: ", async (input) => {
        const result = await model.embedContent(input);
        const inputEmbedding = result.embedding.values;

        const pc = new Pinecone({
            apiKey: 'a787ff1d-2c58-41dd-991e-76101e91afc4'
        });
        const index = pc.index('pinecone-chatbot1');

        const queryResult = await index.query({
            vector: inputEmbedding,
            topK: 2,
            includeMetadata: true
        });
        rl.close();
        console.log(queryResult.matches[0].metadata.text);
        return queryResult.matches
        
    });
}

async function getResponseFromGemini(inputText,query) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    const text = response.text();
    

}

async function run() {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    userInput(model);
}
run();