
const getDb = require('../util/database').getDb;
const { MongoClient, ObjectId } = require('mongodb');

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }


  static fetchAll() {
    const db = getDb();
    return db
      .collection('products').find({})
      .toArray()
      .then(result => {
        //console.log(result);
        return result
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchSingleProduct(productid) {
    const db = getDb();
    
    return db.collection('products')
       .findOne({_id:new ObjectId(productid)})
      .then(product => {
        console.log(product);
        return product
      })
      .catch(err => {
        console.log(err);
      });
  }


  static updateById(productid,title,price,imageUrl,description) {
    const db = getDb();
    return db.collection('products')
       .updateOne({_id:new ObjectId(productid)},{$set:{title:title,price:price,description:description,imageUrl:imageUrl}})
      .then(product => {
        console.log(product);
        return product
      })
      .catch(err => {
        console.log(err);
      });
  }


  static deleteById(productid) {
    const db = getDb();
    return db.collection('products')
       .deleteOne({"_id":new ObjectId(productid)})
      .then(product => {
        console.log(product);
        return product
      })
      .catch(err => {
        console.log(err);
      });
  }


}

module.exports = Product;
