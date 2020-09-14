const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/Users');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const { clientID, clientSecret, callbackURL } = require('../config/keys');
const { clientID1, clientSecret1, callbackURL1 } = require('../config/keys');
const { clientID2, clientSecret2, callbackURL2 } = require('../config/keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
   .then((user) => {
	   done(null, user);
   });
});

const options = {
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: callbackURL
};

const options1 = {
	clientID: clientID1,
	clientSecret: clientSecret1,
	callbackURL: callbackURL1
};

const options2 = {
	clientID: clientID2,
	clientSecret: clientSecret2,
	callbackURL: callbackURL2
};



passport.use(new GoogleStrategy(options,
	(accessToken, refreshToken, profile, email, done) => {
		User.findOne({googleId: email.id})
		.then((user) => {
			if(user){
				done(null,user);
			} else{
				new User({
			       	name: email.displayName,
					email: email.emails[0].value,   
					googleId: email.id
				}).save()
				.then((user) => {
		            done(null,user);
				})
				.catch(err => {
					console.log(err)
				})
			}
		})
		.catch(err => {
			console.log(err);
		})
   })
);

passport.use(new FacebookStrategy(options1,
	function(accessToken, refreshToken, profile,done) {
		console.log(profile);
		User.findOne({facebookId: profile.id})
		.then((user) => {
			if(user){
				console.log('user is',user);
				done(null,user);
			} else{
				new User({
					email: profile.emails[0].value,
					name: profile.name.givenName + ' ' + profile.name.familyName,
					facebookId: profile.id,
				})
				.save().then((user) => {
					console.log('new user created' + user);
					done(null,user);
			   })
			   .catch(err => {
				   console.log(err);
			   })
			}
		})
		.catch(err => {
			console.log(err);
		})
	}
));

passport.use(new GitHubStrategy(options2,
	(accessToken, refreshToken, profile, done) => {
		console.log(profile);
		User.findOne({githubId: profile.id}).then((user) => {
			if(user){
				console.log('user is',user);
				done(null,user);
			} else{
				console.log(profile);
				new User({
					name: profile.username,
					email: "nothing@gmail.com",
					githubId: profile.id,
				}).save()
				.then((user) => {
					console.log('new user created' + user);
					done(null,user);
				})
				.catch((error) => {
					console.log(error);
				})
			}
		}); 
	}
));