const Job= require('../schema/jobSchema')
const joi = require('joi');
const { schema } = require('../schema/userSchema');


async function addJobModel(params) {

    try {

const jobCheck= await addJobValidation(params).catch((err)=>{
    return ({
        error:err
    })
})
console.log(jobCheck.error)
    if(!jobCheck||(jobCheck&&jobCheck.error)){
        
        return {
            error: {
                success: false,
                message: 'Invalid Inputs for add user',
                status: 400
            },
            status: 400
        };
    }
        const addJob = await Job.model.create(params);
        if(!addJob){
            let error={
                success:false,
                message:'error in Adding the Job',
                status:500,
            }
            return ({error:error})
        }
    
        return {
            data:{
                success:true,
                message:"job added successfully",
                status:200,
                addJob
            }
        }
    } catch (error) {
        console.error("Error in  addJob Model",error)
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
async function addJobValidation(param) {
    const schema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        skillsRequired: joi.array().items(joi.string().min(1)).required(), // Array of strings
        thumnail: joi.string().required(),   // Single string for the thumbnail
        amount: joi.number().required(),
        duration: joi.string().optional(),   // Optional duration field
    });
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

module.exports={addJobModel}