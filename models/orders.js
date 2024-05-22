const getDb = require('../util/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');

class Order {
  constructor(userid, productid, quantity) {
    this.userid = userid;
    this.quantity = productid;
    this.productid = productid;

  }

  save(userid,cartproducts) {
    const db = getDb();
    console.log('save cartproducts:',cartproducts);
    const userObjectId=new ObjectId(userid);
    cartproducts.forEach(element => {
        element.userId=userObjectId;
    });
    return db
      .collection('Order')
      .insertMany(cartproducts)
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }


  static fetchAll(customeruserid) {
    const db = getDb();
console.log('orders model customerId:',customeruserid);
    return db
      .collection('Order').find({userId:customeruserid})
      .toArray()
      .then(result => {
    console.log(result);
        return result
      })
      .catch(err => {
        console.log(err);
      });
  }


}

module.exports = Order;
