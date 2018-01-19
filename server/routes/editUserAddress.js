var UserAddressModel = require('./../models/UserAddress');
var editUserAddress = function(req,res){
  UserAddressModel.UserAddress.forge({
  UserAddressId:1,
  UserId:1
  }).fetch().then(function (useraddress){
    useraddress.save({
      Address:req.body.Address || useraddress.get('Address'),
      Locality:req.body.Locality || useraddress.get('Locality'),
      Landmark:req.body.Landmark || useraddress.get('Landmark'),
      Pincode:req.body.Pincode || useraddress.get('Pincode'),
      AddressType:req.body.AddressType || useraddress.get('AddressType')
    }).then(function () {
        res.json({message: 'UserAddress details updated'});
  }).catch(function(err){
    res.status(400).send(err);
  }).catch(function(err){
    res.status(400).send(err);
  });
});
}
exports.editUserAddress = editUserAddress;
