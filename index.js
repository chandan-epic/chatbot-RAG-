const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pinecone }=require('@pinecone-database/pinecone');

const genAI = new GoogleGenerativeAI("AIzaSyDTMlyBcU0KhUqel7TT5NCuvG-KeESoxM8");

async function userInput(input,model) {
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
    //console.log(queryResult.matches[0].metadata.text);
    return queryResult.matches
}


async function getResponseFromGemini(input,modelEmbeded,promptTemplate) {




    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    const match=await userInput(input,modelEmbeded);

    
    const prompt = promptTemplate.replace('{question}', input).replace('{retrievedDocs}', match[0].metadata.text)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log(response.text())
}



const promptTemplate = `
You are an AI assistant with access to a vast database of information. Answer the following question using the most relevant information from your database.
give single line answers only
Question: {question}
Context from retrieved documents:
{retrievedDocs}
Answer:
`;

const input="what is prototyping"


async function run() {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    getResponseFromGemini(input,model,promptTemplate)
}
run();