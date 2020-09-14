const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const utils = require('../lib/utils');

router.post('/signup', (req,res,next) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }
    const saltHash = utils.genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        name,
        email,
        salt,
        hash
    });
    
    newUser.save()
    .then((user) => { 
        if(!user) return res.status(400).json({msg: 'User not created'});

        const jwt = utils.issueJWT(user);

        res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
    })
    .catch((err) => next(err));
});



router.post('/login',(req, res,next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: 'Please enter all fields' });
    }
  
    User.findOne({email: email})
        .then((user) => {
            if(!user){
                res.status(401).json({ success: false, msg: "could not find user"});
            }

            const isValid = utils.validPassword(password, user.hash, user.salt);

            if(isValid){
                const tokenObject = utils.issueJWT(user);
                res.json({ success: true, user: user.name, token: tokenObject.token, expiresIn: tokenObject.expires});

            } else{
                res.json({ success: false, msg: "you enetred the wrong password"});
            }
        })
        .catch((err) => {
            next(err);
        })
  });

router.get('/protected', passport.authenticate('jwt', {session: false}), (req,res,next) => {
    res.status(200).json({success: true, msg: 'you are authorized'});
});

module.exports = router;