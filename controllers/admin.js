const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product=new Product({
    title:title,
    price:price,
    description:description,
    imageUrl:imageUrl
    });
  product.save().then(result=>{
    console.log("product created=",result);
    res.redirect('/admin/products')
  }).catch(err=>{
    console.log(err);
  })
}

exports.getProducts = (req, res, next) => {
  
    Product.find()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};



exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      const products = product;
      if (!products) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: products
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  console.log('body:',req.body);
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findOneAndUpdate(
    {_id: prodId},{
    title:updatedTitle,
    price:updatedPrice,
    imageURL:updatedImageUrl,
    descriptioin:updatedDesc
  })
    .then(result => {
      console.log('result of updated product:',result);
      console.log('UPDATED PRODUCT!:',result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};



exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndDelete(prodId)
    .then(result => {
      console.log('DESTROYED PRODUCT:',result);
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
