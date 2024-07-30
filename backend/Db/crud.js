


const insertContainerData= async (con,data)=>{
    const mydb=con.db("userdatabase")
    const myColl = mydb.collection("containerdetails");
    const result = await myColl.insertOne(data);
    console.log(
       `A document was inserted with the _id: ${result.insertedId}`,
    );
}


const getConatainerData= async (con)=>{
    const mydb=con.db("userdatabase")
    const myColl = mydb.collection("containerdetails");
    const documents = await myColl.find({}).toArray();

    return documents
}


module.exports={
    insertContainerData,
    getConatainerData
}