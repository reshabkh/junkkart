'use strict';
var Bookshelf = require('./database');
var Subcategory = require('./Subcategory');
var subcategoryModel = Subcategory.Subcategory;
var Product = Bookshelf.Model.extend({
   tableName: 'product',
   idAttribute: 'ProductId',
   hasTimestamps: true,
   subcategory: function() {
        return this.belongsTo(subcategoryModel, 'SubcategoryId');//'Subcategory', 'ProductId');
  }
});


var Products = Bookshelf.Collection.extend({
   model: Product
});

Bookshelf.model('Product', Product);
Bookshelf.collection('Products',Products);

exports.Product = Product;
exports.Products = Products;
