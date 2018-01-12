const express = require('express');
const bodyParser =require('body-parser');
//Bookshelf.plugin('registry');
// var UserModel = require('./models/User');
//var SubcategoryModel = require('./models/Subcategory');
var ProductModel = require('./models/Product');
var UserAddressModel = require('./models/UserAddress');
var UserOrderModel = require('./models/UserOrder');
var UserOrderProductsModel = require('./models/UserOrderProducts');
var app = express();
app.use(bodyParser.json());
var bookshelf = app.get('bookshelf');
app.get('/getProducts',function(req , res){
  //var Products = new ProductModel();
  ProductModel.Product.forge().fetchAll({withRelated: ['subcategory']}).then(function(results) {
     // YOUR ADDITION: Display the results as JSON
   //   console.log('Got Product:', results.get('ProductName'));
   // console.log('Got subcategory:', results.related('subcategory'));

     res.json(results.toJSON());
 });
  });

app.post('/saveUserAddress',function(req,res){
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
  });

app.post('/createUserOrders',function(req,res){
   Bookshelf.transaction(function(transaction){
     UserOrderModel.UserOrder.forge({
       UserId:req.body.UserId,
       UserAddressId:req.body.UserAddressId,
       SchedulePickupDate:req.body.SchedulePickupDate,
       Status:req.body.Status,
       Remark:req.body.Remark
     }).save({transacting: transaction})
     .then(function(userOrder){
        transaction.commit;
        for(i=0;i<req.body.Products.length;i++){
          req.body.Products[i].UserOrderId = userOrder.attributes.UserOrderId;
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
       ).invokeThen('save',{transacting: transaction}).then(function(orderProducts){
         //console.log(userOrder);
         transaction.commit;
         userOrder.attributes.Products = orderProducts;
            res.json(userOrder);
         })
       }).catch(function(err){
           transaction.rollback;
           res.status(400).send(err);
       });
     });
   });

app.get('/getUserAddress',function(req,res){
  UserAddressModel.UserAddress.query('where',{UserId:1}).fetchAll().then(function(results){
    res.json(results.toJSON());
  });
});
app.post('/addUserAddress',function(req,res){
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
});
app.put('/editUserAddress',function(req,res){
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
})
app.delete('/deleteUserAddress',function(req,res){
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
});
app.get('/getUserOrders',function(req,res){
  UserOrderModel.UserOrder.forge().fetchAll({withRelated: ['useraddress']}).then(function(results){
    res.json(results.toJSON());
  });
});
app.get('/getUserOrderDetails',function(req,res){
  UserOrderModel.UserOrder.forge().fetchAll({withRelated:['userorderproducts']}).then(function(results){
    res.json(results.toJSON());
  });
});
app.listen(3000, function(){
  console.log('started on port 3000');
});
