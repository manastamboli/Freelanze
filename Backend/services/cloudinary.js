const {v2}=require('cloudinary')
const fs= require('fs')


v2.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.SECRET_KEY_CLOUD
        
    }
)

const uploadFileOnCloudinary = async(filePath)=>{
   try {
    if(!filePath){
        console.log("file not found")
        return null;
    }
    const response= await v2.uploader.upload(filePath,{
        resource_type:'auto'
    })

    fs.unlinkSync(filePath)
    return response;



   } catch (error) {
    console.log("Error in uploading the image to cloudinary",error)
    fs.unlinkSync(filePath)
    return null;

   }

}

module.exports= {uploadFileOnCloudinary}