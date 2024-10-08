const nodemailer= require('nodemailer')

const sendMail=async (sender,reciever,subject,message)=>{
try {
 let transpoter= nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:'manaspublic321@gmail.com',
            pass:process.env.EMAIL_PASS,
        }
    }
 )   

 let info = transpoter.sendMail({
    from:sender,
    to:reciever,
    subject:subject,
    text:message

    
 })
 console.log('Email sent: %s', info.messageId);


} catch (error) {
    console.log("error occured in send mail function",error)
}
}
module.exports=sendMail