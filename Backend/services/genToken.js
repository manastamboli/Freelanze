const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User= require('../schema/userSchema')

async function generateToken(user) {
    const id = user._id
    const userId = await User.model.findById(id)

    const accessToken = jwt.sign({
        userName: user.userName,
        _id:user._id,
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }


    )

    // const refereshToken = jwt.sign({
    //     _id: user._id

    // },
    //     process.env.REFRESH_TOKEN_SECRET,
    //     { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    // )

    userId.accessToken = accessToken
    await userId.save({ validateBeforeSave: false })

    return {  accessToken, userId, user }
}
module.exports={generateToken}
