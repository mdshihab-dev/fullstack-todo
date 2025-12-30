const userModel = require("../../model/userModel")
const bcrypt = require('bcryptjs')
const {generateAccessToken , generateRefreshToken} = require('../../token/token')

const loginController = async (req, res) => {
    try {
    let {email,password} = req.body
    let errors = {}
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let isEmailValid = pattern.test(email)

    errors.email = !email ? "email is required" : isEmailValid ? '' : "email is not valid"
    errors.password = !password ? "password is required" : ''

    let userExist = await userModel.findOne({email})
    if(!userExist) return res.status(400).json({error: 'invalid credential'})
        
    let isPasswordValid = await bcrypt.compare(password, userExist.password)
    if(!isPasswordValid) return res.status(400).json({error: 'invalid credential'})
    if(!userExist.isVerified) return res.status(403).json({error: "Please verify your account"})

    
    let accessToken = generateAccessToken(userExist)
    let refreshToken = generateRefreshToken(userExist)

    userExist.refreshToken = refreshToken
    await userExist.save()
    res.cookie('refreshToken', refreshToken , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 365 * 24 * 60 * 60 * 1000
    })
    res.send({
        message: 'login successfull',
        accessToken: accessToken,
        username: userExist.username,
        email: userExist.email
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = loginController