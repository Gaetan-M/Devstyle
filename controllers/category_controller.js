const Category = require('../models/category_model')
const cloudinary = require('../cloudinary_config');
const fs = require('fs');

module.exports.createCategory = async (req, res, next) => {

	console.log(req.body)
		let urls = [];
		try {
			console.log(req.body)
			const uploader = async (path) => await cloudinary.uploads(path, `DevStyle/${req.body.name}`)
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
			const category = new Category({
				...req.body, image: urls[0]
			})
			category.save()
				.then(category => {
					console.log(category)
					res.status(200).json({
						status: true,
						message: 'category succesfully created',
						category: category
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
module.exports.updateCategoryImage = async (req, res, next) => {
	let id = req.params.id
	let urls = [];
	let result;
	let num = req.files.length
	const uploader = async (path) => await cloudinary.uploads(path, `DevStyle/${req.body.name}`)
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
	await Category.updateOne({ _id: id }, {
		image:urls[0],...req.body
	})
		.then(result => {
			res.status(200).json({ message: `category Image was updated !` })
		})
		.catch(error => res.status(404).json({ message: 'category does not exist', error: error.message }))

}
module.exports.getAllCategory = (req, res, next) => {
	Category.find()
		.then(result => {
			res.status(200).json({
				Category:result,
			})
		})
		.catch(error => {
			res.status(400).json({ error })
			console.log(error)
		})

}
module.exports.getOneCategory = (req, res, next) => {
	console.log(req.body)
	Category.findOne({ _id: req.params.id })
		.then(Category => {
			res.status(200).json({ Category: Category })
		})
		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.updateOneCategory = (req, res, next) => {
	console.log(req.body)
	Category.findOneAndUpdate({ _id: req.params.id },
		{ ...req.body }
	)
		.then(Category => {
			res.status(200).json({
				message: 'category succesfully saved',
				Category: Category
			})
		})
		.catch(error => {
			res.status(400).json({ error })
		})
}

module.exports.deleteCategory = (req, res, next) => {
	Category.findOneAndDelete({ _id: req.params.id })

		.then(Category => {
			res.status(200).json({
				message: 'category succesfully deleted'
			})
		})

		.catch(error => {
			res.status(400).json({ error })
		})
}
