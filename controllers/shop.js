const Product = require('../models/product');
const cart=require("../models/cart");
const Order=require("../models/orders");
const User=require("../models/user");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product(title,price,description,imageUrl);
  product.save().then(result=>{
    console.log("product created=",result);
    res.redirect('/admin/products')
  }).catch(err=>{
    console.log(err);
  })
}

exports.getProducts = (req, res, next) => {
      Product.find()
    .select('name price')
    .populate('userId')
    .then(products => {
      console.log('fetched Products:',products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};


exports.getIndex = (req, res, next) => {
  
    Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/index', {
        prods: products,
        pageTitle: 'all Products',
        path: '/'
      });
    })
    .catch(err => console.log(err));
};


exports.getProduct = (req, res, next) => {
  console.log(req.params.productId);
    Product.findById(req.params.productId)
    .then(products => {
      res.render('shop/product-detail', {
        product: products,
        pageTitle: 'Admin Products',
        path: 'shop/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postCart=(req,res,next)=>{
const prodId=req.body.productId;
console.log('prodId:',prodId);
Product.findById(prodId).then(product=>{
    return req.user.addToCart(product);
}).then(result=>{
    console.log('result:',result);
    res.redirect('/cart');
}).catch(err=>{
  console.log('err updaring cart:',err);
})
}


exports.getCart=(req,res,next)=>{
req.user.populate('cart.items.productId').then(result=>{
  console.log('hello world:',result);
})
req.user.populate('cart.items.productId').
then(user=>{
console.log('proudcts:',user.cart.items);
const products=user.cart.items;
console.log('cart products:',products);
    res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
        products:products
    });
}).catch(err=>{
    console.log(err);
})

}

exports.postCartDeleteProduct=async (req,res,next)=>{
try{
const prodId=req.body.productId;
console.log('delete prodId:',prodId);
req.user.removeFromCart(prodId).then(result=>{
console.log('result post delete:',result);
res.redirect('/cart');
}).catch(err=>{
  console.log('err:',err);
})

}
catch(err){
    console.log('something went wrong:',err);
}

}

exports.postOrder=(req,res,next)=>{
  const currentUserId=req.user.id;
  console.log('currentUserId:',currentUserId);
  const cart=req.user.cart.items;
  const userid=req.user.id
  console.log('post order userid:',userid);
  const order=new Order(null,null,null)
  order.save(userid,cart).then(result=>{
    console.log('save result:',result);
    if(result.insertedCount>0){
    req.user.updateCart([]).then(result=>{
      console.log('cart has been empty:',result);
      
    }).catch(err=>{
      console.log('something went wrong during cart empty:',err);
    })
    }
    res.redirect('/orders');
  }).catch(err=>{
    console.log('something went wrong during post order:',err);
  })

  }
  exports.getOrders=(req,res)=>{
    const currentUserId=req.user.id;
    Order.fetchAll(currentUserId).then(products=>{
      console.log('now result:',products);
      res.render('shop/cart',{
        path:'/cart',
        pageTitle:'Your Cart',
        products:products
    });

  }).then(err=>{
    console.log('err during loading cart items:',err);
  })
  }



exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findById(prodId)
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
