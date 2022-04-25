//const jwt = require("jsonwebtoken");
const { default: adminBro } = require("admin-bro");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user_model.js");
require("dotenv").config();

module.exports.defaultUser = (req, res, next) => {
    bcrypt
    .hash("admin@237", 10)
    .then((hash) => {
  const user = User({ name: "admin",surname:"Bro",email:"devstylebot@gmail.com",password:hash,role:"admin",phone:655922472})
 // User.deleteOne({email:"devstylebot@gmail.com"}) 

 user.save()
  .then((user) => {
      console.log(user);
       res.status(200).json({ user: user })
    })
    .catch(console.log);
}
)
};
module.exports.register = (req, res, next) => {
  const {
    email,
    phone,
    password,
    name,
    surname,
    role
  } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 10)
    .then((hash) => {
        console.log(hash)
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        surname: surname,
        role: role,
        password: hash,
      });
      user
        .save()
        .then((user) => {
          console.log(user)
          if (!user)
            return res.status(400).json({ error: "user are not created" });
          //let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
          res.status(200).json({
            message: "account created",
            user: user
          });
          console.log(user);
        })
        .catch((error) => {
          res.status(500).json({ message: "error: account not created" });
          console.log("account", error);
        });
    })
    .catch((error) => console.log("bcrypt", error));
};
module.exports.login = (req, res, next) => {
    console.log(req.body)
    const { password, email } = req.body;
      User.findOne({ email: email },{password:0})
        .then((user) => {
          try {
            if (!user) return res.status(404).json({ message: "user not found" });
            let verify = bcrypt.compareSync(password, user.password);
            console.log("verify", verify);
            if (verify == false)
              res
                .status(500)
                .json({ message: "authentication failed or incorrect password" });
            //let token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
            res.status(200).json({
              message: `${user.name} authenticated successfully`,
              user: user
            });
          } catch (error) {
            console.log(error.message);
          }
        })
        .catch((error) => {
          res.status(500).json(error.message);
        });
    };