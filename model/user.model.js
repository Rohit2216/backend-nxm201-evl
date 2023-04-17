const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        default:'user',
    }
});


const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
})

const UserModel=mongoose.model("user",userSchema)

const BlogModel=mongoose.model("blog",blogSchema)


module.exports={
    UserModel, BlogModel
}