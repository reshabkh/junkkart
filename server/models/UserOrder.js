'use strict';
var Bookshelf = require('./database');
var UserAddress = require('./UserAddress');
var UserOrderProduct = require('./UserOrderProducts');
var UserAddressModel = UserAddress.UserAddress;

Bookshelf.plugin('registry');
var UserOrder = Bookshelf.Model.extend({
  tableName: 'userorder',
  idAttribute: 'UserOrderId',
  hasTimestamps: false, //if you want to write true then first add two column in useraddress table
  useraddress: function() {
       return this.hasOne('UserAddress', 'UserAddressId');
 },
 userorderproducts: function() {
      return this.hasMany('UserOrderProduct','UserOrderProductId');
 }
});

var UserOrders = Bookshelf.Collection.extend({
  model: UserOrder
});

  Bookshelf.model('UserOrder', UserOrder)
  Bookshelf.collection('UserOrders',UserOrders);

exports.UserOrder =  UserOrder;
exports.UserOrders = UserOrders;
