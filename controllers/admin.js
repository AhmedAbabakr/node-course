const product = require('../models/product');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imgUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title:title,
    price:price,
    description:description,
    imgUrl:imageUrl,
    userId:req.user
  }
   
  );
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    // Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imgUrl;
  const updatedDesc = req.body.description;

  const product =  Product.findById(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imgUrl = updatedImageUrl;
    product.description = updatedDesc;
   return  product
    .save()
  })
  .then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  const itemPerPage = 2;
  let totalItems;
  Product.find()
  .count()
  .then(numProducts => {
      totalItems  = numProducts;
      return Product.find().skip((page -1) * itemPerPage).limit(itemPerPage)
  })
  .then(products => {
    
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isAuthenticated: req.session.isLoggedIn,
      totalItems : totalItems,
      currentPage:page,
      hasNextPage : itemPerPage*page < totalItems,
      hasPreviousPage : page>1,
      nextPage : page +1,
      previousPage : page -1,
      lastPage : Math.ceil(totalItems/itemPerPage)
    });
  })
    .catch(err => console.log(err));
};

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByIdAndDelete(prodId)
//     .then(() => {
//       console.log('DESTROYED PRODUCT');
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };


exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByIdAndDelete(prodId)
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.status(200).json({message:"Success!"});
    })
    .catch(err =>res.status(500).json({message:"Failed TO Delete!"}));
};