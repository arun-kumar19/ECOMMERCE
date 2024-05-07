const User = require('../models/user');

exports.getAddUser = (req, res, next) => {
    res.render('shop/signup', {
      pageTitle: 'sign up',
      path: '/shop/signup',
    });
  };

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const mobileno = req.body.mobileno;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if(password!=confirmpassword){
        //return 501 not implemened due to password mismatch
    }
    else{
    const user=new User(name,mobileno,email,password);
    user.save().then(result=>{
      console.log("user created=",result);
      res.redirect('/shop/login')
    }).catch(err=>{
      console.log(err);
    })
  }
}
  exports.getUserProfile = (req, res, next) => {

    const id = req.body.password;
    User.findUserById(id)
      .then(result => {
        const result = result;
        if (!products) {
          return res.redirect('/');
        }
        res.render('shop/profile', {
          pageTitle: 'User Profile',
          path: '/shop/profile',
          result:result 
        });
      })
      .catch(err => console.log(err));
  };
  