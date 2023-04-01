const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  product:[{

    quantity:{type:Number,required:true},
    product:{type:Object,required:true}
  }
  ],
  user:{
    name:{
      type:String,
      required:true
    },
    userId:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"User"
    }
  }
});
module.exports = mongoose.model("Order",orderSchema);