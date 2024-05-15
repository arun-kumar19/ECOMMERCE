const getDb = require('../util/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');

class Cart {
  constructor(userId,quantity,id, productId) {
    this.quantity = quantity;
    this._id=id?new mongodb.ObjectId(id):null;
    this.userId=userId;
    this.productId=productId;

  }



  static fetchAll() {
    const db = getDb();
    return db
      .collection('cart').find({})
      .toArray()
      .then(result => {
        //console.log(result);
        return result
      })
      .catch(err => {
        console.log(err);
      });
  }



  static updateCart(productId,updatedQuantity) {
    const db = getDb();
    return db.collection('cart')
       .updateOne({productId:new ObjectId(productId)},{$set:{quantity:updatedQuantity}})
      .then(product => {
        console.log("updated cart:",product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }


  static fetchProductQuantityByUserId(userId,productId) {
    const db = getDb();
    return db.cart.findOne({$where:{"_id":new ObjectId(userId), "productId":new ObjectId(productId)}})
      .then(cartItem => {
        if(cartItem){
            console.log("Quantity:",cartItem);
            return cartItem.quantity;
        }
        else{
            console.log('Product not found in the cart');
            return null;
        }
        
      })
      .catch(err => {
        console.log('error fetching product quantity');
        console.log(err);
        throw err;
      });
  }


}

module.exports = Cart;
