const {stopTask}=require("../aws_ecs/ecsconnection");
const { getContainerTaskarn} =require("../Db/crud");
const client =require("../Db/dbconnection");
const stopbot=async(req,res)=>{
    const ip=req.body.link;
    const taskarn=await getContainerTaskarn(client,ip);
    stopTask(taskarn);
}

module.exports=stopbot;