require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.APP_PORT;
const userRouter = require("./api/users/user.router");
const cors = require("cors");
const passport = require("passport");
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
require("./passport-setup");
let path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile); 
app.use(passport.initialize());
app.use(passport.session());

// parse application/json
app.use(bodyParser.json());

app.use(express.json());
app.use("/api/users", userRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "GET,PUT,PATCH,DELETE,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/',(req,res)=>{
    res.render("pages/index")
})
// const isLoggedIn = (req,res,next)=>{
//     if(req.user){
//         next()
//     }else{
//         res.sendStatus(401);
//     }
// }
// app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// app.get('/good', isLoggedIn, (req, res) =>{
//     res.render("pages/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
// })

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.json({message:'Login Successful Please check the console'});
  }
);

// app.get('/logout', (req, res) => {
//     req.session = null;
//     req.logout();
//     res.redirect('/');
// })




app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
