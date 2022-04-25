const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const mongoose = require('mongoose')
const User = require ('../models/user_model')
const express = require('express')
const app = express()
const mongoStore = require
const bcrypt = require('bcrypt')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  branding: {
    companyName: 'DEVSTYLE',
  },
})


const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro' , 
  cookiePassword : process.env.ADMIN_COOKIE_PASS,
  
  authenticate: async(email , password) => {
    const user = await User.findOne({email : email , role:'admin'})
   if(user && await bcrypt.compareSync(password , user.password)) {
     return user.toJSON()
   }
  return null 
  }
})

module.exports = router;
