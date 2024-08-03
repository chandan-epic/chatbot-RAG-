


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

const getContainerTaskarn = async (con, ip) => {
    const mydb = con.db("userdatabase");
    const myColl = mydb.collection("containerdetails");

    // Query to find the document by botname
    const query = { ip: ip };
    const document = await myColl.findOne(query);

    if (document) {
        // Return the task ARN from the document
        return document.taskarn;
    } else {
        // Handle the case where no document was found
        console.log(`No container data found for botname: ${ip}`);
        return null;
    }
};
const delContainer = async (con, ip) => {
    const mydb = con.db("userdatabase");
    const myColl = mydb.collection("containerdetails");

    // Query to find the document by botname
    const query = { ip: ip };
    const result = await myColl.deleteOne(query);
    console.log('Deleted document count:', result.deletedCount);
};


module.exports={
    insertContainerData,
    getConatainerData,
    getContainerTaskarn,
    delContainer
}