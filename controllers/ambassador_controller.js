const Ambassador = require('../models/ambassador_model.js')
const cloudinary = require('../cloudinary_config');
const fs = require('fs'); 

module.exports.createAmbassador= async(req,res,next)=>{
    /*
    REQUIRED:


    */
    let urls = [];
    try {
        console.log(req.body)
        const uploader = async (path) => await cloudinary.uploads(path, `DevStyle/Ambassadors`)
        for (const file of req.files) {
            const { path } = file
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
            console.log(newPath)
        }
        //console.log('urls', urls)
        if (urls == [])
            res.status(500).json({ message: "sorry an error occur", status: false })
        const ambassador = new Ambassador({
            ...req.body,image:urls[0]
        })

        ambassador.save()
        .then(result=>{
            console.log(result)
            res.status(200).json
            ({
                message:"Ambassador create successfully !!",
                body:result
            })
        })
        .catch(error=>res.status(500).json
        ({
            message:"Ambassador not created",
            error:error.message
        }))
    }catch(error){
        res.status(500).json({
            message:"an error occur !",
            error:error.message
        })
    }
}

module.exports.getAllAmbassadors=(req,res,next)=>{

    Ambassador.find()
    .then(results=>{
        console.log(results)
        res.status(200).json({Ambassadors:results})
    })
    .catch(error=>res.status(500).json(error.message))
}

module.exports.getOneAmbassadors=(req,res,next)=>{

    Ambassador.find({_id:req.params.id})
    .then(result=>{
        console.log(result)
        res.status(200).json({Ambassador:result})
    })
    .catch(error=>res.status(500).json(error.message))
}

module.exports.updateOneAmbassadors=(req,res,next)=>{

    Ambassador.findOneAndUpdate({_id:req.params.id},{...req.body},{new:true})
    .then(result=>{
        console.log(result)
        res.status(200).json({Ambassador:result})
    })
    .catch(error=>res.status(500).json(error.message))
}

module.exports.deleteOneAmbassadors=(req,res,next)=>{

    Ambassador.deleteOne({_id:req.params.id})
    .then(result=>{
        console.log(result)
        res.status(200).json({Ambassador:result})
    })
    .catch(error=>res.status(500).json(error.message))
}

module.exports.updateAmbassadorImage = async (req, res, next) => {
	let id = req.params.id
	let urls = [];
	let result;
	let num = req.files.length
	const uploader = async (path) => await cloudinary.uploads(path, `DevStyle/Ambassador`)
			for (const file of req.files) {
				const { path } = file
				const newPath = await uploader(path)
				urls.push(newPath)
				fs.unlinkSync(path)
				console.log(newPath)
			}
			//console.log('urls', urls)
			if (urls == [])
				res.status(500).json({ message: "sorry an error occur", status: false })
	await Ambassador.findOneAndUpdate({ _id: id }, {
		image:urls[0],...req.body
	},{new:true})
		.then(result => {
			res.status(200).json({ message: `Ambassador Image was updated !` ,ambassador:result})
		})
		.catch(error => res.status(404).json({ message: 'Ambassador does not exist', error: error.message }))

}