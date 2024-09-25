const mongoose =require('mongoose')
require('dotenv').config()
 mongoose.connect(process.env.MONGO_STRING)

 mongoose.connection.on('connected',()=>{
    console.log('freelance database connected')
 })

 mongoose.connection.on('error',()=>{
    console.log("error in freelance database connection")
 })
 module.exports=mongoose;