function createBot(req,res){

     console.log(req.file);
     console.log(req.body);
 
     if (!req.file) {
         return res.status(400).json({ message: 'No file uploaded' });
     }
     console.log('PDF file content (Buffer):', req.file.buffer);
    res.json({message:"sucess"})
}

module.exports={
    createBot
}