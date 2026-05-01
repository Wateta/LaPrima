const mongoose=require('mongoose');

const orderSchema= new mongoose.Schema({
orderNum:{
    type:Number,
    required:true

},
customer:{
    type:String,
    required:true
},
item:{
    type:String,
    required:true,
},
money:{
    type:Number,
    required:true
},
status:{
type:String,
enum:['Now','Preparing','Ready']
},
timeOrdered:{
type:String,
required:true
},
},
{
    timestamps:true,
},
);
module.exports =mongoose.model('Order',orderSchema);
