const express=require("express")
require("dotenv").config()
const { connection } = require("./db")
const {auth}=require("./middleware/auth.middleware")
const {userRouter}=require("./router/user.router")
const {blogRouter}=require("./router/blog.router")

const app=express()

app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/blogR",blogRouter)



app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected sucessfully")
    } catch (error) {
        console.log("db is not connected. Try again")
        console.log(error)
    }

    console.log(`server is running on port ${process.env.port}`)
})