const express=require("express");
const app=express();
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');
const mongoConnect=require("./util/database").mongoConnect;
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

mongoConnect((db)=>{

app.listen(3000);

//console.log(db);
})