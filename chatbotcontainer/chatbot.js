async function userInput(input,model,pc,namespace) {
    const result = await model.embedContent(input);
    const inputEmbedding = result.embedding.values;
    const index = pc.index('pinecone-chatbot1');
    const queryResult = await index.namespace(namespace).query({
        vector: inputEmbedding,
        topK: 2,
        includeMetadata: true,
    });
    return queryResult.matches;
}
async function getResponseFromGemini(input,modelEmbeded,promptTemplate,modeltxt,pineconeApi,namespace) {
       
    const match=await userInput(input,modelEmbeded,pineconeApi,namespace);
    // console.log(match);
    const prompt = promptTemplate.replace('{question}', input).replace('{retrievedDocs}', match);
    const result = await modeltxt.generateContent(prompt);
    const response = await result.response;
    console.log(response.text())
    return response.text()
}
module.exports = {
    getResponseFromGemini
  };