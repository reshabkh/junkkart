var UserAddressModel = require('./../models/UserAddress');
var deleteUserAddress = function(req,res){
  UserAddressModel.UserAddress.forge({
    UserAddressId:6,
    UserId:1
  }).fetch().then(function (deleteuseraddress){
    deleteuseraddress.destroy()
    .then(function () {
        res.json({error: true, data: {message: 'User Successfully deleted '}});
  }).catch(function (err) {
        res.status(400).send(err);
      });
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
exports.deleteUserAddress = deleteUserAddress;
