const mongoose = require('mongoose');
const { Schema } = mongoose;

const AmbassadorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String
	},
	image:{},
	description:{
		type: String
	},
	networks:[{
		name:String,
        link:String,
	}],

},{timestamps:true})

module.exports = mongoose.model('Ambassador', AmbassadorSchema);