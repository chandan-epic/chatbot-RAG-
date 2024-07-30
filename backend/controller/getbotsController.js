const { getConatainerData } =require("../Db/crud")
const client =require("../Db/dbconnection")
const getbots = async(req,res)=>{
    const data=await getConatainerData(client)
    console.log(data)
    res.json({data:data})
}

module.exports=getbots