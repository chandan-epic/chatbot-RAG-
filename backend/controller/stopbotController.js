const {stopTask}=require("../aws_ecs/ecsconnection");
const { getContainerTaskarn,delContainer} =require("../Db/crud");
const client =require("../Db/dbconnection");
const stopbot=async(req,res)=>{
    const ip=req.body.link;
    const taskarn=await getContainerTaskarn(client,ip);
    //stopTask(taskarn);
    delContainer(client,ip)
    res.json({message:"sucess"});
}

module.exports=stopbot;