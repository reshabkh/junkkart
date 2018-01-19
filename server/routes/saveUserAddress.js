var UserAddressModel = require('./../models/UserAddress');
var saveUserAddress = function(req,res){
    UserAddressModel.UserAddress.forge({
      UserId: req.body.UserId,
      Address: req.body.Address,
      Locality: req.body.Locality,
      Landmark: req.body.Landmark,
      Pincode: req.body.Pincode,
      AddressType: req.body.AddressType
    }).save()
    .then(function(useraddress){
      res.send(useraddress);
    })
    .catch(function(err){
      res.status(400).send(err);
    });
  }
  exports.saveUserAddress =  saveUserAddress;
