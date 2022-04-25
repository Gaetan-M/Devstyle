const mongoose=require('mongoose');
const diffHistory = require('mongoose-diff-history/diffHistory')
const { Schema } = mongoose;
const categorySchema = new Schema({
	name:{
		type:String,
		required:true,
		unique:true
	},
	color:String,
	image:{},
},{timestamps:true})

categorySchema.plugin(diffHistory.plugin)
module.exports= mongoose.model('Category', categorySchema);

/*Required
-Name
*/