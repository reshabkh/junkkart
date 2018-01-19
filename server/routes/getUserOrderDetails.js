var UserOrderModel = require('./../models/UserOrder');
var UserOrderProductsModel = require('./../models/UserOrderProducts');
var getUserOrderDetails = function(req,res){
  UserOrderModel.UserOrder.query('where',{UserOrderId:28})
  .fetchAll({withRelated:[
    'userorderproducts'/*:function(qb){
      qb.where({'UserOrderId':28})
    }*/
  ]
}).then(function(results){
    res.json(results.toJSON());
  });
}
exports.getUserOrderDetails = getUserOrderDetails;
