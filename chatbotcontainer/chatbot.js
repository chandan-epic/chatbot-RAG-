async function userInput(input,model,pc,namespace,dbname) {
    const result = await model.embedContent(input);
    const inputEmbedding = result.embedding.values;
    console.log(dbname);
    const index = pc.index(`${dbname}`);
    const queryResult = await index.namespace(namespace).query({
        vector: inputEmbedding,
        topK: 2,
        includeMetadata: true,
    });
    return queryResult.matches;
}
async function getResponseFromGemini(input,modelEmbeded,promptTemplate,modeltxt,pineconeApi,namespace,dbname) {
       
    const match=await userInput(input,modelEmbeded,pineconeApi,namespace,dbname);
    const prompt = promptTemplate.replace('{question}', input).replace('{retrievedDocs}', match);
    const result = await modeltxt.generateContent(prompt);
    const response = await result.response;
    console.log(response.text())
    return response.text()
}
module.exports = {
    getResponseFromGemini
  };