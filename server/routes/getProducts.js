var ProductModel = require('./../models/Product');
var SubcategoryModel = require('./../models/Subcategory');
var getProducts = function(req , res){
  //var Products = new ProductModel();
  ProductModel.Product.forge().fetchAll({withRelated: ['subcategory']}).then(function(results) {
     // YOUR ADDITION: Display the results as JSON
   //   console.log('Got Product:', results.get('ProductName'));
   // console.log('Got subcategory:', results.related('subcategory'));

     res.json(results.toJSON());
 });
  }
  exports.getProducts =  getProducts;
