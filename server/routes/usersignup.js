var UserModel = require('./../models/User');
var usersignup = function(req,res){
  UserModel.User.forge({
    UserId: req.body.UserId,
    Name: req.body.Name,
    Email: req.body.Email,
    MobileNumber: req.body.MobileNumber,
    Email: req.body.Email,
    updated_at:req.body.updated_at,
    created_at:req.body.created_at

  }).save()
  .then(function(usersignup){
    res.send(usersignup);
  })
  .catch(function(err){
    res.status(400).send(err);
  });
}
exports.usersignup = usersignup;
