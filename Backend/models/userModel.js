const User= require('../schema/userSchema')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const joi = require('joi')
//const bycrypt = require('bcryptjs')
const bcrypt = require('bcryptjs'); // Make sure bcrypt is imported


async function createUserModel(param) {
    try {
        // Validate the user input
        const userCheck = await addUserValidation(param);
        if (!userCheck || (userCheck && userCheck.error)) {
            return {
                error: {
                    success: false,
                    message: 'Invalid Inputs for add user',
                    status: 400
                },
                status: 400
            };
        }

        // Hash the password before creating the user
        const hashedPassword = await bcrypt.hash(param.userPassword, 10);
        param.userPassword = hashedPassword;

        // Create the user
        const addUser = await User.model.create(param);
        if (!addUser) {
            return {
                error: {
                    success: false,
                    message: "Error in adding user",
                    status: 500
                },
                status: 500
            };
        }

        // Return success response
        return {
            data: {
                success: true,
                message: 'User added successfully',
                status: 200,
                addUser
            }
        };
    } catch (err) {
        // General error catch
        console.error('Error in createUserModel:', err);
        return {
            error: {
                success: false,
                message: 'An error occurred while adding the user',
                status: 500
            },
            status: 500
        };
    }
}




async function addUserValidation(param) {
    const schema = joi.object({

        userName: joi.string().required(),
        userEmail: joi.string().required(),
        userPassword: joi.string().required(),
        role:  joi.string()

    })
    let validateSchema = await schema.validateAsync(param, { abortEarly: false }).catch((err) => { return { error: err } })

    if (!validateSchema || (validateSchema && validateSchema.error)) {
        const msg = []; 
        for (let i of validateSchema.error.details) {
            msg.push(i.message);

        }
        return { error: msg }

    }
    return { data: validateSchema.data };

}
async function generateToken(userId) {
    const user = await User.model.findById(userId)
     const accessToken = jwt.sign({
         userName: user.userName,
         userEmail: user.userEmail
     },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
 
 
     )
 
     const refereshToken = jwt.sign({
         _id:userId
 
     },
     process.env.REFRESH_TOKEN_SECRET,
     {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
 )
 
 return {accessToken,refereshToken,user}
 }
 
// login

async function loginValidation(param) {
    const schema = joi.object({

        userName: joi.string().required(),
        userEmail: joi.string(),
        userPassword: joi.string().required()

    })
    let validateSchema = await schema.validateAsync(param, { abortEarly: false }).catch((err) => { return { error: err } })

    if (!validateSchema || (validateSchema && validateSchema.error)) {
        const msg = [];
        for (let i of validateSchema.error.details) {
            msg.push(i.message);

        }
        return { error: msg }

    }
    return { data: validateSchema.data };

}

async function loginUser(param) {
    const loginCheck = await loginValidation(param).catch((err) => {
        return ({ error: err })
    })
    if (!loginCheck || (loginCheck && loginCheck.error)) {
        let error = {
            success: false,
            message: "error",
            status: 400
        }
        return { error, status: 400 }
    }
    const loginData = await User.model.findOne({ userName: param.userName}).catch((err) => {
        return ({ error: err })
    })
    if (!loginData || (loginData && loginData.error)) {

        let error = {
            success: false,
            message: "error in searching user",
            status: 500
        };
        return { error, status: 500 }


    }
   
    return {
        data: {
            success: true,
            message: "login Succesfull",
            status: 200,
            loginData:loginData,
           
        }
    }

}
async function addUserSkills(params){
    console.log(params)
    if(!params){
        const error={
            success:false,
            message:"error in user input",
            status:400,

        }
        return {error, status:400}
    }
    const userDetail =jwt.verify(params, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        // Access token is valid
        console.log("Token:",decoded)
        return({ message: 'Access token is valid', user: decoded });
        
    });
   console.log(userDetail)
   return ({userDetail})
} 
    
async function addUserExperience(params) {
    if(!params){
        const error={
            success:false,
            message:"error in user input",
            status:400,

        }
        return {error, status:400}
    }
    const userDetail =jwt.verify(params, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }

        // Access token is valid
        console.log("Token:",decoded)
        return({ message: 'Access token is valid', user: decoded });
        
    });
    console.log(userDetail)
    return({userDetail})
    
}
module.exports={createUserModel,generateToken,loginUser,addUserSkills,addUserExperience}


