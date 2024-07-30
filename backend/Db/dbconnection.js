const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://chatbotuser:123@cluster0.xqrb7st.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports=client