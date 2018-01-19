var UserOrderModel = require('./../models/UserOrder');
var getUserOrders = function(req,res){
  UserOrderModel.UserOrder.query('where',{UserOrderId:req.query.UserOrderId})
  .fetchAll({withRelated: ['useraddress']})
  .then(function(results){
    res.json(results.toJSON());
  });
}
exports.getUserOrders = getUserOrders;
