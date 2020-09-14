const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/Users');
const { EMAIL, PASSWORD, LINK } = require('../config/keys');
const crypto = require('crypto');
const { genPassword } = require('../lib/utils');

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
}

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages', success);
  }
});

router.post('/contact', (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: EMAIL, 
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({success: false, msg: 'Your message failed to send'});
    } else {
      res.json({success: true, msg: 'Your message has been sent successfully'});
    }
  })
})

router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
    if(err){
      console.log(err);
    }
    const token = buffer.toString("hex");

    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
          return res.json({success: false, msg:"User doesn't exists with that email"});
      }
      console.log(user);
      if(user.salt){
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000;
        user.save()
        .then((result) => {
          var mail = {
            from: EMAIL,
            to: result.email,
            subject: "Password Reset",
            html: `
            <p>You requested for password reset</p>
            <h5>Click in this <a href="${LINK}/Reset/${token}">Link</a> to reset password</h5>
            `
          };

          transporter.sendMail(mail, (err, data) => {
            if (err) {
              res.json({success: false, msg: 'Failed to send mail'});
            } else {
              console.log("1");
              res.json({success: true, msg:"Check your email"});
            }
          });
        })
      }else {
        return res.json({success: false, msg:"User doesn't exists with that email"});
      }
    })
  })
})


router.post('/new-password',(req,res)=>{
  const newPassword = req.body.password;
  const sentToken = req.body.token;

  User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(user => {
    if(!user){
        return res.status(422).json({success: false, msg:"Try again session expired"});
    }
    const saltHash = genPassword(newPassword);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    user.salt = salt;
    user.hash = hash;
    user.resetToken = undefined
    user.expireToken = undefined

    user.save()
    .then((saveduser)=>{
        res.json({success: true, msg:"Password updated successfully"});
    })
  })
  .catch(err=>{
    console.log(err);
    res.json({success: false, msg: err});
  })
})

module.exports = router;