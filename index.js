const express =require('express');
const app=express();
const cors=require('cors');
const dbConnect = require('./db_connect.js');
const Authentication=require('./routes/authentication_route.js');
const Product = require('./routes/product_route.js');
const Category= require('./routes/category_route.js');
const Ambassador =require('./routes/ambassador_route.js')
const Admin = require('./controllers/admin_controller')
const bodyparser=require('body-parser');
/*****cors error protection and data parsing*****/
/*app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});*/
app.use(cors());
app.use('/admin',  Admin)
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));
//app.use(express.json({limit:"100mb"}));
//app.use(express.urlencoded({limit:"100mb"}));
//app.use(compression())
/*******endpoints******/
app.use('/', Category)
app.use('/',Product)
app.use('/',Ambassador)
app.use('/',Authentication)

module.exports=app