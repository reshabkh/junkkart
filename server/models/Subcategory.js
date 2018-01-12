'use strict';
var Bookshelf = require('./database');
var Product = require('./Product');
var ProductModel = Product.Product;


var Subcategory = Bookshelf.Model.extend({
   tableName: 'subcategory',
   idAttribute: 'SubcategoryId',
   hasTimestamps: true,
   products: function() {
        return this.hasMany(ProductModel);//;'Product', 'ProductId');
  }
});

var Subcategorys = Bookshelf.Collection.extend({
   model: Subcategory
});

Bookshelf.model('Subcategory', Subcategory);
Bookshelf.collection('Subcategorys',Subcategorys);

exports.Subcategory = Subcategory;
exports.Subcategorys = Subcategorys;
