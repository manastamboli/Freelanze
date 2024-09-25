
const mongoose=require('../db/connection')

try {
    let Job=function (data){
        this.data=data
    }
    Job.schema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        skillsRequired: {
            type: [String],  // Array of strings
            required: true
        },
        duration: {
            type: String,
        },
        thumnail: {
            type: String,   // Single string for the thumbnail
        },
        amount: {
            type: Number,
        },
        employer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        }
    });
    Job.model= mongoose.models.jobs || mongoose.model('jobs',Job.schema)

    module.exports=Job;
} catch (error) {
    console.log("Error from job Schema",error)
}