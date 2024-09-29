const express = require('express');
const signupModel = require('../models/signup');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);



app.post('/signup', async (req, res) => {
    const userInfo = req.body
    try {
        if (
          userInfo.name.trim() === "" ||
          userInfo.email.trim() === "" ||
          userInfo.password.trim() === ""
        ) {
          return res.status(400).send("Fields should not be empty");
        }
        if (userInfo.password.length < 3) {
          return res.status(400).send("Password should be at least 3 characters long");
        }
    
        let foundUser = await signupModel.findOne({ email: userInfo.email }).exec();
    
        if (foundUser) {
          return res.status(400).send("This user already exists");
        } else {
          let newUser = new signupModel({
            name: userInfo.name,
            email: userInfo.email,
            password: bcrypt.hashSync(userInfo.password, salt),
            role: "user",
          });
    
          await newUser.save();
          return res.status(200).json({ name: newUser.name });
        }
      } catch (err) {
        console.log("Something went wrong:", err);
        res.status(500).send("Something went wrong");
      }
    });
    


module.exports = app