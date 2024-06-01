const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  order:{
    items:[{
      productId: {type:Object, required:true},
      quantity:{type:Number,required:true}
    }]
  } 
  
});

module.exports = mongoose.model('Order', orderSchema);
