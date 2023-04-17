
// middleware


const jwt = require('jsonwebtoken');
require("dotenv").config()
const {UserModel} = require("../model/user.model")
const {blacklist} = require("../blacklist")

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if(blacklist.includes(token)){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const decodedToken = jwt.verify(token, "rohit");
    console.log(decodedToken)
    const { userId } = decodedToken;

    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized', err : error.message});
  }
};




module.exports = {auth};
