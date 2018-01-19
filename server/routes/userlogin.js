var UserModel = require('./../models/User');
const Promise = require('bluebird');
var userlogin = function(req,res){

var Email = req.body.Email;
var password = req.body.password;

 Promise.coroutine(function* () {
        const user = yield UserModel.User.where('Email', Email).fetch();
        const isValidPassword = yield user.validPassword(password);
   //console.log(usersignup);
   if(isValidPassword){
     res.json({
                   status:true,
                   message:'successfully authenticated'
               })
   }else{
     res.json({
                 status:false,
                 message:"Email and password does not match"
                });
   }
 })()
    //res.send(userlogin);
.catch(function(err){
    res.status(400).send(err);
  });
}
exports.userlogin = userlogin;
