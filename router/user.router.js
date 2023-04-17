const express = require('express')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {auth}=require("../")
const UserModel = require("../model/user.model")

const userRouter = express.Router();



// signup part

userRouter.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {

            //  store hash password in your db

            const user = new UserModel({ email, name, role, password: hash })

            await user.save()

            res.status(200).send({ msg: "user Signup Sucessful" })
        })
    } catch (error) {
        res.status(400).send({ msg: error.message })

    }
})


// login part


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(401).json({ msg: "Invalid Credentials" })
        }

        const isPassValid = await bcrypt.compare(password, user.password)
        if (!isPassValid) {
            return res.status(401).send({ msg: "Invalid password" })
        }

        const token = jwt.sign({ userId: user._id }, "rohit", { expiresIn: "1m" })
        const refreshToken = jwt.sign({ userId: user._id }, "manish", { expiresIn: "3m" })

        res.json({token,refreshToken})

    } catch (error) {
        res.status(400).send({ msg: error.message })

    }
})


// refreshtoken


userRouter.post("/refresh-token",async(req,res)=>{
    const refreshToken=req.body.refreshToken;

    try {
        const decodedToken=jwt.verify(refreshToken,"manish");

        const user=await UserModel.findById(decodedToken.userId)

        const token=jwt.sign({userId:user._id},"rohit",{expiresIn:"1m"})
        res.json({token});
    } catch (error) {
        console.log(error)
        res.status(401).send({msg:error.message})
    }


})




// logout

userRouter.get("/logout",auth,(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    blacklist.push(token)
    res.send("logout succesfull")
})



module.exports={
    userRouter
}






