
'use strict';
var Bookshelf = require('./database');
Bookshelf.plugin('registry');
var UserAddress = Bookshelf.Model.extend({
  tableName: 'useraddress',
  idAttribute: 'UserAddressId',
  hasTimestamps: false,//if you want to write true then first add two column in useraddress table
   user: function() {
        return this.belongsTo('User','UserId');
   }
});

var UserAddresses = Bookshelf.Collection.extend({
  model: UserAddress
});

 Bookshelf.model('UserAddress', UserAddress);
 Bookshelf.collection('UserAddresses',UserAddresses);


exports.UserAddress = UserAddress;
exports.UserAddresses = UserAddresses;

//module.exports = Bookshelf.model('UserAddress', UserAddress);
