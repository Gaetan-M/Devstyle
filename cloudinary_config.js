const cloudinary = require("cloudinary");
require('dotenv').config
cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})

exports.uploads=(file,folder)=>{

    return new Promise(resolve=>{
        cloudinary.uploader.upload(file,(result)=>{
            console.log(result)
            resolve({
                url:result.url,
                secure_url:result.secure_url,
                id:result.public_id
            })
        },
        {
            resource_type:"auto",
            folder:folder
        })
    })
}