const express = require('express')
const router = express.Router()
const cors = require('cors');
const User = require('../models/signup');
const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('../keyes');
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


router.post('/signup', cors(corsOptions), (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(30),
    Password: Joi.string().required().min(4).max(10),
    Conform_pass: Joi.string().required().min(4).max(10),
    phone: Joi.number().required().min(8000000000).max(9999999999),
    address: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email()

  });
  const result = schema.validate(req.body)
  if (!result.error) {
    res.status(200).send('You are Signed Up Successfully!!!')
  } else {
    res.send(result.error)
  }

  bcrypt.hash(req.body.Password, 12).then(hashedPassword => {
    req.body.Password = hashedPassword
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        console.log("item saved to database");
        console.log("item from frist rout.......................", item)
      })
      .catch(err => {
        console.log("unable to save to database");
        console.log("........................................", err)
        // res.status(400).send("unable to save to database")
      });
  })
  next();
});

router.post('/signin', cors(corsOptions), (req, res, next) => {
 if (!req.body.email || !req.body.Password) {
    console.log("enter user AND PASS")
    console.log("res1.........1")
    res.status(422).json({
      error: "Please add Username and Password"
    })
  } else {
    User.findOne({email: req.body.email}).then(savedUser => {
      if (!savedUser) {
        res.status(422).json({
          error: "Invalid username"
        })

      } else {
     
        bcrypt.compare(req.body.Password, savedUser.Password).then(domatch => {
          if (domatch) {
            const token = jwt.sign({
              _id: savedUser._id
            }, JWT_SECRET)
            res.status(200).send(token)
          } else {
            res.send("invalid Username and Password!!!")
          }
        })
        
       
      }
    }).catch(err => next(err));
  }




})


module.exports = router;