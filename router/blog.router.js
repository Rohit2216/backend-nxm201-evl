const express=require("express")

const {BlogModel}=require("../model/user.model")

const blogRouter=express.Router();


// create a blog 

blogRouter.post("/blog",async(req,res)=>{
    try {
        const blog=new BlogModel({
            title:req.body.title,
            content:req.body.content,
            author:req.user._id
        })
        await blog.save()
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({msg:error.message})
        
    }
})


// Read all the blogs 

blogRouter.get("/",async(req,res)=>{
    try {
        const blogs=await BlogModel.find().populate("author","name","email")
        res.json(blogs);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
})



// update all the blogs


blogRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body;
    const blogId=req.params.id;
    try {
        await BlogModel.findByIdAndUpdate({_id:blogId},payload)
        res.status(200).send({msg:"updated successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

// delete a blog

blogRouter.delete("/delete/:id",async(req,res)=>{
    // const payload=req.body;
    const blogId=req.params.id;
    try {
        await BlogModel.findByIdAndDelete({_id:blogId})
        res.status(200).send({msg:"Deleted successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

//delete a blog for moderators only


blogRouter.delete("/delete/:id",async(req,res)=>{
    const blogId=req.params.id;
    try {
        const blog= await BlogModel.findByIdAndDelete({_id:blogId})
        if(!blog){
            return res.status(400).send({msg:"blog not found"})
        }else{
            return res.status(200).send({msg:"blog deleted successfully"})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})


module.exports={
    blogRouter
}