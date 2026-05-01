const mongoose=require('mongoose');

const menuSchema= new mongoose.Schema({

name:{
    type:String,
    required:true
},
category:{
    type:String,
    enum:['Hot drinks','Cold drinks','Fast food','Chinese'],
    required:true,
},
money:{
    type:Number,
    required:true
},
orderNumber:{
    type:Number,
    required:true
},
status:{
type:String,
enum:['Active','Sold Out']
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
module.exports =mongoose.model('Menu',menuSchemaSchema);
