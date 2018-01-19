var UserOrderModel = require('./../models/UserOrder');
var ProductModel = require('./../models/Product');
var UserOrderProductsModel = require('./../models/UserOrderProducts');
var knex = require('knex');
var bookshelf = require('bookshelf')(knex);

var createUserOrders = function(req,res){
   bookshelf.transaction(function(transaction){
     UserOrderModel.UserOrder.forge({
       UserId:req.body.UserId,
       UserAddressId:req.body.UserAddressId,
       SchedulePickupDate:req.body.SchedulePickupDate,
       Status:req.body.Status,
       Remark:req.body.Remark
     }).save(null,{transacting: transaction})
     .then(function(userOrder){

        for(i=0;i<req.body.Products.length;i++){
          req.body.Products[i].UserOrderId = userOrder.attributes.UserOrderId;
          transaction.commit;
        }
         UserOrderProductsModel.UserOrderProducts.forge(req.body.Products
           //[
         //  {
         //    UserOrderId:userOrder.attributes.UserOrderId,
         //    ProductId:req.body.Products[0].ProductId,
         //    Quantity:req.body.Products[0].Quantity
         //  },{
         //    UserOrderId:userOrder.attributes.UserOrderId,
         //    ProductId:req.body.Products[1].ProductId,
         //    Quantity:req.body.Products[1].Quantity
         //    }
         // ]
       ).invokeThen('save',null,{transacting: transaction}).then(function(orderProducts){
         //console.log(userOrder);

         userOrder.attributes.Products = orderProducts;
            res.json(userOrder);
            transaction.commit;
         }).catch(function(err){
             res.status(400).send(err);
             transaction.rollback;
         });
       }).catch(function(err){
           res.status(400).send(err);
           transaction.rollback;
       });
     //});
   }).exec(callback);
 }
     exports.createUserOrders =  createUserOrders;
