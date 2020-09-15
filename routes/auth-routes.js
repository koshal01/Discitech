const utils = require('../lib/utils');
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google',passport.authenticate('google',{ scope:['profile', 'email'] } ));
router.get('/facebook',passport.authenticate('facebook'));
router.get('/github',passport.authenticate('github'));

router.get('/google/redirect',passport.authenticate('google', { failureRedirect: '/Login' }),(req,res) => {
	// const user = req.user;
  // if(user){
  //  	const jwt = utils.issueJWT(user);
  //   res.redirect('/');
  //   res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
  // } else{
  //  	res.status(401).json({ success: false, msg: "Not Authorized"});
  // }
  res.redirect('/About');
});

router.post('/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/Login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    const user = req.user;
    if(user){
      const jwt = utils.issueJWT(user);
      res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
    } else
    {
      res.status(401).json({ success: false, msg: "Not Authorized"});
    }
});
 
router.post('/github/redirect',
  passport.authenticate('github', { failureRedirect: '/Login' }),
  (req, res) => {
    const user = req.user;
    if(user){
   	  const jwt = utils.issueJWT(user);
	  res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires});
    } else{
   	  res.status(401).json({ success: false, msg: "Not Authorized"});
    }
});
 
module.exports = router;