const Product = require('../models/product_model')
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs');
const cloudinary = require('../cloudinary_config');

module.exports.createProduct = async (req, res, next) => {
	let urls = [];
	let result;
	try {
		console.log(req.body)
		const uploader = async (path) => await cloudinary.uploads(path, 'VendLe_Image')
		for (const file of req.files) {
			const { path } = file
			const newPath = await uploader(path)
			urls.push(newPath)
			fs.unlinkSync(path)
			console.log(newPath)
		}
		//console.log('urls', urls)
		console.log(req.body.type)
		if (urls == [])
			res.status(500).json({ message: "sorry an error occur", status: false })
		const product = new Product({
			...req.body, image: urls[0]
		})
		product.save()
			.then(Product => {
				res.status(200).json({
					status: true,
					message: 'product succesfully created',
					//Product: Product
				})
			})
			.catch(error => {
				res.status(500).json({ error: error, status: false })
				console.log({ error: error, status: false })
			})
	} catch (error) {
		console.log(error)
	}

}


module.exports.getAllProduct = (req, res, next) => {
	Product.find()
		.then(Product => {
			res.status(200).json({ Product: Product })
		})

		.catch(error => {
			res.status(400).json({ error })
			console.log(error)
		})

}

module.exports.getOneProduct = (req, res, next) => {
	
	Product.findOne({ _id: req.params.id })

		.then(Product => {
			res.status(200).json({ Product: Product })
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.updateOneProduct = (req, res, next) => {
	console.log(req.body)
	Product.findOneAndUpdate({ _id: req.params.id },{ ...req.body },{new:true})
		.then(Product => {
			res.status(200).json({
				message: 'product succesfully updated',
				Product: Product
			})
		})
		.catch(error => {
			res.status(400).json({ error })
		})
}


module.exports.deleteProduct = (req, res, next) => {
	Product.findOneAndDelete({ _id: req.headers.id })

		.then(Category => {
			res.status(200).json({
				message: 'product succesfully deleted'
			})
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.updateProductImage = async (req, res, next) => {
	let urls = [];
	let result;
	try {
		console.log(req.body)
		const uploader = async (path) => await cloudinary.uploads(path, 'VendLe_Image')
		for (const file of req.files) {
			const { path } = file
			const newPath = await uploader(path)
			urls.push(newPath)
			fs.unlinkSync(path)
			console.log(newPath)
		}
		if (urls == [])
			res.status(500).json({ message: "sorry an error occur", status: false })
		await Product.findOneAndUpdate({ _id: req.params.id }, {
			image: urls[0]
		},{new:true})
		.then(product => {
			res.status(200).json({ message: `product Image of ${product.name} was updated` })
		})
		.catch(error => res.status(404).json({ message: 'An error occur', error: error.message }))
	}catch(error){
		res.status(500).json({error:error.message})
	}

}

module.exports.getProductCategory = async(req, res, next) => {
	/*
	category : id de la category dont on veut les produits
	skip: le nombre a partir duquel on commence a recuperer les produits
	*/
	Product.find({category:req.headers.category}).skip(req.headers.skip).limit(30)
		.then(products => {
			return res.status(200).json({
				error: false,
				products: products,
			})
		})
		.catch(error => console.log(error.message));
}

module.exports.getNewProduct = (req, res, next) => {
	/*
	skip: le nombre a partir duquel on commence a recuperer les produits
	*/
	Product.find().skip(req.headers.skip).limit(5).sort({"createdAt":-1})
		.then( products => {
			return res.status(200).json({
				error: false,
				products: products,
			})
		})
		.catch(error => console.log(error.message));
}

module.exports.getHotProduct = (req, res, next) => {
	/*
	skip: le nombre a partir duquel on commence a recuperer les produits
	*/
	Product.find().skip(req.headers.skip).sort({"views":-1,"likes":-1}).limit(10)
		.then( products => {
			return res.status(200).json({
				error: false,
				products: products,
			})
		})
		.catch(error => console.log(error.message));
}

module.exports.updateLikes=(req,res,next)=>{
	Product.findOneAndUpdate({ _id: req.params.id },{$inc:{"likes":1}},{new:1})
	.then(result=>res.status(200).json({message:"new like",likes:result.likes}))
	.catch(error=>res.status(500).json({message:"An error occur"}))
}

module.exports.updateViews=(req,res,next)=>{
	Product.findOneAndUpdate({ _id: req.params.id },{$inc:{"views":1}},{new:1})
	.then(result=>res.status(200).json({message:"new view",views:result.views}))
	.catch(error=>res.status(500).json({message:"An error occur"}))
}
