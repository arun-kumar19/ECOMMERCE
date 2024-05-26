const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
//const mongoConnect=require("./util/database").mongoConnect;
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const User=require('./models/user');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('663f6f249ddd0db0e63a692d').then(user=>{
        console.log('user:',user);
        req.user=new User({_id:user._id,name:user.name,email:user.email,mobileno:user.mobileno,cart:user.cart});
        console.log("user info:",req.user);
        next();
    }).catch(error=>{
        console.log('error find user:',error);
    })

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://arunklt21:884vCCrMuPJbujgN@mongodbtest.jlnffhd.mongodb.net/?retryWrites=true&w=majority&appName=Mongodbtest'
  )
  .then(result => {
    console.log('connected');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });