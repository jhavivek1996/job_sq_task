require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
const userRouter = require("./api/users/user.router")
const cors = require('cors');
const passport = require('passport')
var cookieSession = require('cookie-session')
var bodyParser = require('body-parser')
require('./passport.setup')


app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.use(express.json());
app.use("/api/users",userRouter)


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "GET,PUT,PATCH,DELETE,POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
    name:'vivek',
    keys:['']
}))
app.get('/',(req,res)=>{
    res.json({
        message:"Login Failed"
    })
})

const isLoggedIn = (req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.sendStatus(401);
    }
}
app.get('/success', isLoggedIn,(req,res)=>{
    res.json({
        message:`Welcome ${req.user.email}`
    })
})
app.get('/google/',
    passport.authenticate('google',{ scope :['profile','email',]}));

app.get('/google/callback',
    passport.authenticate('google',{failureRedirect:'/failed'}),
    function(req,res){
        res.redirect('/')
    });

app.get('/logout',(req,res)=>{
    req.session = null;
    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`Server is Listening on ${port}`)
})