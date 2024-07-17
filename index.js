const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const PDFParser = require("pdf-parse");
// const { Pinecone } =require("pinecone");
// const { PineconeClient } = require("@pinecone-database/pinecone");
const { Pinecone }=require('@pinecone-database/pinecone');




const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");
// const pineconeClient = new Pinecone.Client("a787ff1d-2c58-41dd-991e-76101e91afc4", "pinecone-chatbot");


async function run() {
    // For embeddings, use the Text Embeddings model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Example PDF file path
    const pdfFilePath = "./inputdata/OOSE.pdf";
    console.log("Using PDF path:", pdfFilePath);

    // Read PDF content
    const pdfData = fs.readFileSync(pdfFilePath);
    const pdfText = await extractTextFromPDF(pdfData);

    // Split content into chunks for embedding
    const chunkSize = 500; // Adjust this based on your needs
    const chunks = splitTextIntoChunks(pdfText, chunkSize);

    // Array to store all embeddings
    const allEmbeddings = [];

    // Embed each chunk separately
    for (let chunk of chunks) {
        const result = await model.embedContent(chunk);
        const embedding = result.embedding;
        allEmbeddings.push(embedding.values); // Store embedding values
    }

    // Store embeddings in Pinecone
    await storeEmbeddingsInPinecone(allEmbeddings);

    console.log("All embeddings stored in Pinecone.");
}

async function extractTextFromPDF(pdfData) {
    const data = await PDFParser(pdfData);
    return data.text;
}

function splitTextIntoChunks(text, chunkSize) {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
        chunks.push(text.substring(i, i + chunkSize));
    }
    return chunks;
}

async function storeEmbeddingsInPinecone(embeddings) {
    const pc =new Pinecone({
        apiKey: 'a787ff1d-2c58-41dd-991e-76101e91afc4'
    });
    console.log("pinecone connected");
    // const index = await Pinecone.storeEmbeddingsInPinecone()
    const index = pc.index('pinecone-chatbot1');

    for (let i = 0; i < embeddings.length; i++) {
        const embedding = embeddings[i];
        // await index.upsert(i.toString(), embedding);
        await index.upsert([{
            id: i.toString(),
            values: embedding,
            // text:chunk
        }]);
    }
}

run();