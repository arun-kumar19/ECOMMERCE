const getDb = require('../util/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');
const cart=require("../models/cart");

class User {
  constructor(name, mobileno, email, password,cart,id) {
    this.name = name;
    this.mobileno = mobileno;
    this.email = email;
    this.password = password;
    this.cart=cart;
    this.id=id;
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


  addToCart(product) {
    const db = getDb();
    console.log('before add to cart:',product);
    let updatedCart={items:[{productid:new ObjectId(product._id),quantity:1}]};
    if(this.cart!=null){
    let cartItemIndex=this.cart.items.findIndex(element => element.productid.toString()==product._id.toString());
    //console.log('element.productid:',element.productid, ' and ','product._id:',product._id);
    console.log('cartItemIndex:',cartItemIndex);
    if(cartItemIndex!==-1){
            this.cart.items[cartItemIndex].quantity+=1;

        return db
      .collection('users')
      .updateOne({"_id":new ObjectId(this.id)},{$set:{cart:this.cart}})
      .then(result => {
        console.log('updated cart result:',result);
      })
      .catch(err => {
        console.log(err);
      });
    }
        else{
            this.cart.items.push({productid:new ObjectId(product._id),quantity:1});
            return db
      .collection('users')
      .updateOne({"_id":new ObjectId(this.id)},{$set:{cart:this.cart}})
      .then(result => {
        console.log('updated new cart result:',result);
      })
      .catch(err => {
        console.log(err);
      });
           }
        }
    
    
  }

}

module.exports = User;
