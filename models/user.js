const getDb = require('../util/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');

class User {
  constructor(name, mobileno, email, password) {
    this.name = name;
    this.mobileno = mobileno;
    this.email = email;
    this.password = password;
    this.confirmpassword = confirmpassword;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }


  static findUserById(userid) {
    const db = getDb();
    
    return db.collection('users')
       .findOne({_id:new ObjectId(userid)})
      .then(result => {
        console.log(result);
        return result
      })
      .catch(err => {
        console.log(err);
      });
  }



}

module.exports = User;
