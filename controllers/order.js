const Order=require('../models/order');


const getAllOrders=async (req,res)=>{
    try{
const  orders=await Order.find({});
if(!orders){
    res.staus(404).json({message:"Orders not found"});
}
res.status(200).json(orders);
}
catch(error){
    res.status(500).json({message:message.error});
}
};
const getOdersById= async (req,res)=>{
    try{
        const {id}=req.params.id;
 const orders= await Order.findById(id);
 if(!orders){
    res.status(404).json({message:"Orders not found"});
 }
   res.status(200).json(orders);
    }
    catch(error){
    res.status(500).json({message:message.error});
    }
};

const getOrderByStatus= async (req,res)=>{
    try{
  const {status}=req.params;
  const orders=await Order.find({status});
  if(!orders){
    res.status(404).json({message:"Orders not found"});
 }
     res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({message:message.error});
    }
}

const addOrder= async (req,res)=>{
    try{
 const {orderNum,customer,item,money,status,timeOrdered}=req.body;
  const newOrders= await Order.create(
   {
    orderNum,
    customer,
    item,
    money,
    status,
    timeOrdered
   }
  )
  const savedOrders= await newOrders.save();
  res.status(201).json(savedOrders);
    }
    catch(error){
      res.status(500).json({message:message.error});  
    }
}

const updateOrder= async (req,res)=>{
    try{
 const {orderNum,customer,item,money,status,timeOrdered}=req.body;
 const orders= await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true , runValidators: true }
 )
 if(!orders){
    res.status(404).json({message:"Orders not Found"});
 }
 res.status(200).json(orders);
    }
    catch(error){
        res.status(500).json({message:message.error}); 
    }
};

const deleteOrder= async (req,res)=>{
    try{
const deletedOrder=await Order.findByIdAndUpdate(req.params.id);

 if(!deletedOrder){
    res.status(404).json({message:"Order not found"});
 }
 res.status(200).json({message:"Deleted successfully"});
    }
    catch(error){
    res.status(500).json({message:message.error});  
    }
};

module.exports = {  getOAllOrders, 
  getOdersById,
 getOrderByStatus,
 addOrder,
 updateOrder ,
 deleteOrder
};
