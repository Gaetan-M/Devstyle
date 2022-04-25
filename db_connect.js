const mongoose=require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
})
.then(()=>console.log('db is successfully connected !'))
.catch((error)=>console.log(error,'connection to db failed !'))



mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})

module.exports=mongoose;