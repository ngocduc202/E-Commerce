const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var oderSchema = new mongoose.Schema({
    products:[
   {
    product : {type : mongoose.Types.ObjectId , ref :'Product'} ,
    quantity : Number ,
    color : String ,
    price : Number,
    thumbnail : String,
    title : String
   }
    ],
    status:{
        type:String,
        default : 'Processing',
        enum : ['Cancelled' , 'Processing' ,'Success']
    },
    total:Number,
    orderBy:{
        type:mongoose.Types.ObjectId,
        ref : 'User'
    },
});

//Export the model
module.exports = mongoose.model('Oder', oderSchema);