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
    return this.belongsTo('UserOrder','UserOrderId');
  }
});

var UserOrderProducts = Bookshelf.Collection.extend({
  model: UserOrderProduct
});

 Bookshelf.model('UserOrderProduct', UserOrderProduct);
 Bookshelf.collection('UserOrderProducts',UserOrderProducts);

exports.UserOrderProduct =  UserOrderProduct;
exports.UserOrderProducts = UserOrderProducts;
