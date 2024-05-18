const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name:String,
    age:Number,
    username:String
})



const UserModel=mongoose.model("users",UserSchema);
module.exports=UserModel;