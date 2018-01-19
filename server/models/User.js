// User Model
// ==========
// Create a user model class


'use strict';
var Bookshelf = require('./database');
//Bookshelf.plugin('registry');
var UserAddress = require('./UserAddress');
var UserAddressModel = UserAddress.UserAddress;
const Promise = require('bluebird');


var User = Bookshelf.Model.extend({
  tableName: 'user',
  idAttribute: 'UserId',
  hasTimestamps: true,
  useraddress: function() {
       return this.hasMany('UserAddressModel');//;'Product', 'ProductId');
  },
  validPassword(password) {
       return bcrypt.compareAsync(password, this.attributes.password);
   }
});

var Users = Bookshelf.Collection.extend({
  model: User
});
Bookshelf.model('User', User);
Bookshelf.collection('Users',Users);

exports.User = User;
exports.Users = Users;
//Bookshelf.model('User', User);
