const userModel= require('../models/userModel')
const token= require('../services/genToken')
const User= require('../schema/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const sendMail= require('../services/sendMail')
// const cookies= require('js-cookie');

require('dotenv').config();

async function addUserController(req, res) {
   const testData=req.body
    const data = await userModel.createUserModel(testData).catch((err) => {
        return { error: err }

    })
    const resultToken= await token.generateToken(data.data.addUser)
    console.log(resultToken,"it is access token from signup")

    console.log(testData)
    console.log("data:",data)
    if (!data || (data && data.error)) {
        let error = (data && data.error) ? data.error : "Internal Server Error";
        let status = (data && data.status) ? data.status : 500;
        console.log("comming from here")
        console.log(data)
        return res.status(status).json(error);
    };

    const options = {
        httpOnly: true,
        secure: true,
        sameSite:'lax',
        
    }
     
    let status = (data && data.status) ? data.status : 200;
    return res.status(status)
    .cookie("accessToken",resultToken.accessToken, options)
    .json({ data: data.data });
}
//token
async function generateToken(user) {
    const id = user._id
    const userId = await User.model.findById(id)

    const accessToken = jwt.sign({
        userName: user.userName,
        userEmail: user.userEmail
    },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }


    )

    const refereshToken = jwt.sign({
        _id: user._id

    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )

    userId.refreshToken = refereshToken
    await userId.save({ validateBeforeSave: false })

    return { refereshToken, accessToken, userId, user }
}

//login
async function loginUserController(req, res) {
    const demoData=req.body;
    console.log(demoData)

    const loginData = await userModel.loginUser(demoData).catch((err) => {
        return ({ error: err })
    })
    console.log("login data:",loginData);
    if (!loginData || (loginData && loginData.error)) {
        console.log("error cooming from here")

        let error = (loginData && loginData.errmsg) ? loginData.errmsg : "internal server error";
        let status = (loginData && loginData.status) ? loginData.status : 500;
        return res.status(status).json(error)
    }

    const { userName, userEmail, userPassword } = req.body;
    const user = await User.model.findOne({ $or: [{ userName }, { userEmail }] })
    console.log(user._id)
    console.log("hashed Password-", user.userPassword)


    if (!user) {
        let error = {
            success: false,
            message: "invalid credentials",
            status: 400
        }
        res.status(400).json(error)
    }
   
   const password= await bcrypt.compare(userPassword,user.userPassword)
        console.log(password)
        if(!password){
        let error = {
            success:false,
            message:"invalid Password",
            status:400
        }
        res.status(400).json(error)
    }


    const { refereshToken, accessToken, userId } = await generateToken(user)

    console.log(userId)



    const options = {
        httpOnly: true,
        secure: true,
        sameSite:'lax',
        
    }
     
     
    return res.status(200)
        .cookie("accesstoken", accessToken, options)
        .cookie("refreshtoken", refereshToken, options)

        .json({ loginData, accessToken, refereshToken })

}
async function addUserSkillController(req,res) {
    console.log(req.cookies.accesstoken);
    
    const access=req.cookies.accessToken
     const skills=req.body
     console.log("token from skills page",access)
    const accessToken= await userModel.addUserSkills(access).catch((err)=>{
        return({error:err})
    });
    if(!accessToken){
        const error={
            success:false,
            message:"error in accessing token",
            status:500
        }
        return ({error:error})
    }

  console.log(accessToken)
 const userName=accessToken.userDetail.user.userName;

 const user = await User.model.findOne({userName}).catch((err)=>{
    return ({error:err})
 })
 const updatedUser = await User.model.findByIdAndUpdate(
    user._id,
    { $addToSet: { skills: { $each: skills } } },  // Add each skill without duplicates
    { new: true }  // Return the updated document
);
 console.log(user)
 res.status(200).json({updatedUser})
}

async function addUserExperienceController(req, res) {
    try {
        const access=req.cookies.accessToken
        console.log(access,"bro")
        if (!access) {
            return res.status(401).json({ success: false, message: "Access token missing", status: 401 });
        }

        // Extract experience from request body
        const experience = req.body;
        if (!experience || Object.keys(experience).length === 0) {
            return res.status(400).json({ success: false, message: "Experience data is missing or invalid", status: 400 });
        }

        console.log('Access Token:', access);
        
        // Validate and get the user based on the access token
        const accessToken = await userModel.addUserExperience(access);
        if (!accessToken) {
            return res.status(500).json({ success: false, message: "Error in accessing token", status: 500 });
        }

        const userName = accessToken.userDetail.user.userName;
        console.log('User Name:', userName);

        // Find the user in the database
        const user = await User.model.findOne({ userName });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found", status: 404 });
        }

        // Add experience to the user's experience array
        user.userExperience.push(experience);
        await user.save();

        return res.status(200).json({ success: true, message: "Experience added", user });
        
    } catch (err) {
        console.error('Error in addUserExperienceController:', err);
        return res.status(500).json({ success: false, message: "Internal server error", status: 500 });
    }
}
// async function getCurrentUser(req, res) {
//     const user = req.cookies.accessToken ;
//    console.log(user);
//    const userDetail =jwt.verify(user, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//     if (err) {
//         return res.status(401).json({ message: 'Invalid access token' });
//     }

//     // Access token is valid
//     console.log("Token:",decoded)
//     return({ message: 'Access token is valid', user: decoded });
    
// });
//     return res.status(200).json(userDetail);
    

// }


const getCurrentUser = (req, res) => {
    // Avoid sending the entire request or response object
    const user = req.user; // Extract only necessary data
    res.json({ user }); // Send only relevant data
  };
  
 async function middlewareCheck(req,res) {
    const user = req.user;
    console.log(user);
    return res.status(200).json(user)
    
    
 }

async function emailSendController(req,res) {
    const{sender,reciever,subject,message}=req.body;
   try {
     await sendMail(sender,reciever,subject,message)
    
     res.status(200).json("email sent successfully")
   } catch (error) {
    res.status(400).json({message:'error occured in mail controller',error})
   }

    
}
 
module.exports={
    addUserController,
    loginUserController,
    addUserSkillController,
    addUserExperienceController,
    getCurrentUser,
    middlewareCheck,
    emailSendController
}
