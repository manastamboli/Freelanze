const Job = require('../schema/jobSchema')
const jobModel = require('../models/jobModels');


async function addJobController(req,res) {
    const file=req.file;
    console.log("it is file",file)
    console.log("it is body",req.body)
    const jobDetails ={
      title:req.body.title,
      description:req.body.description,
      skillsRequired: Array.isArray(req.body.skillsRequired) ? req.body.skillsRequired : [req.body.skillsRequired],
      thumnail:file ? file.filename : null,
      amount:req.body.amount
    }
    
    console.log(file.destination);
    console.log("it is body ",jobDetails);
    
    if(!jobDetails){
      res.status(400).json({error:"Error in getting details"})
    }
    else{
      if(!file){
        res.status(400).json({error:"Error in getting file"})
      }
    }


   const jobData = await jobModel.addJobModel(jobDetails).catch((err)=>{
    return ({error:err})
   })
   console.log("from model",jobData)

   if((!jobData || (jobData&&jobData.error))){
   let error = (jobData&&jobData.error)? jobData.error : "Error in Internal server";
   let status = (jobData && jobData.status)? jobData.status: 500;

   return res.status(status).json(error)

   }
   let status = (jobData&&jobData.status)? jobData.status : 200;
   return res.status(status).json({data:jobData.data})

    
 }

 async function displayJobs(req,res) {
   const Jobs = await Job.model.find({});
   console.log(Jobs)
   if(!Jobs){
    let error={
      success:false,
      message:"Error in Displaying Jobs ",
      status:500
    }
    return res.status(500).json({error:error})
   }

   return res.status(200).json(Jobs)
 }

 module.exports={addJobController,displayJobs}