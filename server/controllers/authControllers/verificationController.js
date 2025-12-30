const jwt = require('jsonwebtoken');
const userModel = require("../../model/userModel")
 
 const verificationController = async (req,res) => {
    let {token} = req.params
    try {
        let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        let user = await userModel.findById(decoded.id)
        user.isVerified = true
        await user.save()
        res.status(200).json({message : 'Account verification successful!'})
    } catch (error) {
        console.log(error);     
    }
 };

 module.exports = verificationController;