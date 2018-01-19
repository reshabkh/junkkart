var UserAddressModel = require('./../models/UserAddress');
var getUserAddress = function(req,res){
  UserAddressModel.UserAddress.query('where',{UserId:1}).fetchAll().then(function(results){
    res.json(results.toJSON());
  });
}
exports.getUserAddress = getUserAddress;
