const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const PDFParser = require("pdf-parse");
// const { Pinecone } =require("pinecone");
// const { PineconeClient } = require("@pinecone-database/pinecone");
const { Pinecone }=require('@pinecone-database/pinecone');
const readline = require("readline");
// const { Vector } = require("vectorious");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");



const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");
// const pineconeClient = new Pinecone.Client("a787ff1d-2c58-41dd-991e-76101e91afc4", "pinecone-chatbot");
const textfromPinecone=[]

async function run() {
    // For embeddings, use the Text Embeddings model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    userInput(model);
}

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
    // const index = await Pinecone.storeEmbeddingsInPinecone()
    const index = pc.index('pinecone-chatbot1');

    for (let i = 0; i < embeddings.length; i++) {
        const embedding = embeddings[i];
        // await index.upsert(i.toString(), embedding);
        await index.upsert([{
            id: i.toString(),
            values: embedding
            // text:chunks[i]
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

        console.log(queryResult.matches.length);
        // console.log("Most relevant chunk: ", queryResult.matches[0].metadata.text);
        // console.log(queryResult.matches[0].values.id);
        // for(let i=0;i<4;i++){
        //     textfromPinecone[i]=queryResult.matches[i].metadata.text;
        // }
        // const inputText = textfromPinecone.join('\n');
        // console.log(inputText);
        // getResponseFromGemini(inputText,input)
        rl.close();
    });
}

async function getResponseFromGemini(inputText,query) {
    const payload = {
        text: inputText,
        query: query,
        temperature: 0.7, // Adjust for more or less randomness
        max_tokens: 150,  // Limit the length of the response
        top_p: 0.9,       // Nucleus sampling
        frequency_penalty: 0.5, // Penalize repeating phrases
        presence_penalty: 0.6,  // Encourage new topics
        stop_sequences: ["\n"]  // Stop at a newline character
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Response from Gemini:', data);
    } catch (error) {
        console.error('Error fetching response from Gemini:', error);
    }
}



run();