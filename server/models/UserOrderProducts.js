'use strict';
var Bookshelf = require('./database');
var UserOrder = require('./UserOrder');
var UserOrderModel = UserOrder.UserOrder;
Bookshelf.plugin('registry');
var UserOrderProduct = Bookshelf.Model.extend({
  tableName: 'userorderproducts',
  idAttribute: 'UserOrderProductId',
  hasTimestamps: false,  //if you want to write true then first add two column in useraddress table
  userorder:function(){
    return this.belongsTo('UserOrderModel');
  }
});

var UserOrderProducts = Bookshelf.Collection.extend({
  model: UserOrderProduct
});

var product = Bookshelf.model('UserOrderProduct', UserOrderProduct);
var products = Bookshelf.collection('UserOrderProducts',UserOrderProducts);

exports.UserOrderProduct =  product;
exports.UserOrderProducts = products;
