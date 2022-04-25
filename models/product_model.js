const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	category:{
		//id of specific category
		type:String,
		required:true
	},
	description: {
		type: String
	},
	currentPrice:{
		type:Number,
		required:true
	},
	oldPrice:{
		type: Number
	},
	image:{},
	promote:Boolean,
	views:{
		type: Number
	},
	likes:{
		type: Number
	},
	sizes:[String],
	promotion_pourcentage:{
		type: String
	},

},{timestamps:true})

module.exports = mongoose.model('Product', ProductSchema);