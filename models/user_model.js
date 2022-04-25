const mongoose=require('mongoose')

const UserSchema= mongoose.Schema({

    name:String,
    surname:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:Number,
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('User',UserSchema);