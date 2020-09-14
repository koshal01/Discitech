const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const {MONGOURI} = require('./config/keys');
const passport = require('passport');

const user = require('./routes/user.js');
const contact = require('./routes/mail');
const authRoutes = require('./routes/auth-routes.js');
require('./passportjs/passport')(passport);
const passportSetGoogle = require('./passportjs/passport-google-setup');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log("conneted to MongoDb");
});
mongoose.connection.on('error',(err)=>{
    console.log("Error connecting to database",err);
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', user);
app.use('/auth',authRoutes);
app.use('/mail', contact);

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'));
    const path = require('path');
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
});