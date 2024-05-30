const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileno: {
    type: String,
    required: true
  },
  cart: {
    items:[
      {
  productId: {type:Schema.Types.Object,ref:'Product', required:true},
  quantity:{type:Number,required:true}
  
  }
]
  }
});

userSchema.methods.addToCart=function(product){
  console.log('product:',product);
  //console.log('user id:',this);
    let cartItemIndex=this.cart.items.findIndex(element => element.productId.toString()==product._id.toString());
    console.log('cartItemIndex:',cartItemIndex);
    let newQuantity=1;
    const updatedCartItems=[...this.cart.items]
    console.log('updatedCartItems:',updatedCartItems);
      if(cartItemIndex>=0){
            newQuantity=this.cart.items[cartItemIndex].quantity+1;
            updatedCartItems[cartItemIndex].quantity=newQuantity;
            
            }
    else{
      updatedCartItems.push({
        productId:product._id,
        quantity:newQuantity
      })
    }
    console.log('updatedCartItems:',updatedCartItems);
    const updatedCart={
      items:updatedCartItems
    };
console.log('updatedCart:',updatedCart);
    this.cart=updatedCart;
 //   return this.save();
        
return mongoose.model('User').updateOne(
  { _id: this._id },
  { $set: { 'cart.items': updatedCartItems } }
)
.then(result => {
  console.log('Cart updated:', result);
  return result;
})
.catch(err => {
  console.error('Error updating cart:', err);
});
}
module.exports = mongoose.model('User', userSchema);

userSchema.methods.getCart=function(){

  if(this.cart==null){
    console.log('cart is empty');
    return Promise.resolve([]);
  }
  const productIds=this.cart.items.map(i=>{
      return i.productId;
  });
  console.log('productIds1:',productIds);
//  const User = mongoose.model('User',userSchema);
  return User.find({_id:{$in:productIds}})
  .then(products=>{
   console.log('a:',products);
      return products.map(p=>{
          console.log('b:',p);
          return {...p,quantity:this.cart.items.find(i=>{
              console.log('c:',i);
              return i.productid.toString()==p._id.toString();
          }).quantity
      };
      });
     
  });
}



/*const getDb = require('../util/database').getDb;
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
      console.log('now cart is not empty');
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
          console.log('now cart is empty');
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
        else{
          console.log('something went wrong in cart');
          return db
      .collection('users')
      .updateOne({"_id":new ObjectId(this.id)},{$set:{cart:updatedCart}})
      .then(result => {
        console.log('updated new cart result:',result);
      })
      .catch(err => {
        console.log(err);
      });
        }
    
    
  }

  getCart(){
    const db=getDb();

    if(this.cart==null){
      console.log('cart is empty');
      return Promise.resolve([]);
    }
    const productIds=this.cart.items.map(i=>{
        return i.productid;
    });
    console.log('productIds1:',productIds);
    return db.
    collection('products')
    .find({_id:{$in:productIds}})
    .toArray()
    .then(products=>{
     //   console.log('a:',products);
        return products.map(p=>{
       //     console.log('b:',p);
            return {...p,quantity:this.cart.items.find(i=>{
         //       console.log('c:',i);
                return i.productid.toString()==p._id.toString();
            }).quantity
        };
        });
       
    });
  }


 updateCart(products) {

        const db = getDb(); 
        const updatedCart={items:products}
        console.log('this._id:',this.id.toString());
        console.log('p:',products);
        return db.collection('users').updateOne({ _id: new ObjectId(this.id.toString()) }, { $set: { "cart.items":products } } 
        //findOne({ _id: new ObjectId(this.id.toString()) }
        ).then(result=>{
            console.log('Update result:', result);
        if (result.matchedCount === 0) {
            console.log('No document matched the provided user ID.');
        } else if (result.modifiedCount === 0) {
            console.log('Document found but nothing was modified.');
        } else {
            console.log('Cart updated successfully.');
            return result;
        }
          
        }).catch(err=>{
            console.log('err:',err);
        })
        
    }

}    
module.exports = User;
*/