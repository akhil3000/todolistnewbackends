require("dotenv").config();
const express=require("express");
const app=express();
const cors=require("cors");
const PORT=process.env.PORT;
const UserModel=require("./models/userschema");
const mongoose=require("mongoose");
mongoose.connect(process.env.MONGODBURI).then(()=>{
    console.log("Connected To MongoDB")
})

app.use(express.json());
app.use(cors());
app.get("/getUsers",async(req,res)=>{
    const record=await UserModel.find({});
      res.send(record);
})

app.post("/createUser",async(req,res)=>{
    try{
    const record=req.body;
    console.log(record);
    let{username}=req.body;
    const isUniqueUser=await UserModel.findOne({username});
    if(!isUniqueUser)
    {
        const createdBook=await UserModel.create(record);
         res.send(createdBook);
    
    }

    else{
      throw error("User with this username already exsists");
    }
}catch(error)
{
    res.status(400).send("User with this username already exsists")
}

})


app.delete("/deleteUser/:name",async(req,res)=>{
    
    const {name:taskID}=req.params;

    const record=req.body;
    const deleteBook=await UserModel.deleteOne({name:taskID},record,{
        new:true,
        runValidators:true,
    });
    res.send(deleteBook);
    console.log(deleteBook)  
    

})


app.listen(PORT,()=>{
    console.log("Server is running at PORT:"+PORT);
})
