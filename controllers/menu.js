const Menu = require('../models/menu');

 const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    if (!menuItems) {
      return res.status(404).json({ message: "Menu items not found" });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuItemById = async (req, res) => {
try{
    const{id}=req.params;
const menuItem= await Menu.findById(id);
if(!menuItem){
    res.status(404).json({message:"Item not found"});
}
res.status(200).json(menuItem);

}catch(error){
   res.status(500).json({ message: error.message });
}
};

const getMenuItemByStatus=async (req,res)=>{
    try{
  const {status}=req.params;
  const menuItems=await Menu.find({status});
  if(!menuItems){
    res.status(404).json({message:"No menu items found"});
  }
  res.status(200).json(menuItems);
    }catch(error){
 res.status(500).json({message:error.message});
    }
};

const addMenuItems=async (req,res)=>{
    try{

   const {name,category,money,orderNumber,status,timeOrdered}=req.body;
  const newMenuItem=Menu.create({
 name,
 category,
 money,
 orderNumber,
 status,
 timeOrdered
 
  });
  const savedItem =await newMenuItem.save();
  res.status(201).json(savedItem);
  
    }
    catch(error){
  res.status(500).json({message:error.message});
    }
};

const updateMenuItems=async (req,res)=>{
    try{
  const {name,category,money,orderNumber,status,timeOrdered}=req.body;
  const menuItem=await Menu.findByIAndUpdate(
    req.params.id,
    req.body,
    {new:true , runValidators: true }
  );
  if(!menuItem){
    res.status(404).json({message:"Menu item not found"});
  }
  res.status(200).json(menuItem);
    }
    catch(error){
   res.status(500).json({message:error.message});
};
    }

const deleteMenuItems=async (req,res)=>{
    try{
  const deletedItem=await Menu.findByIdAndDelete(req.params.id);
  if(!deletedItem){
    res.status(404).json({message:"Item not found"});
  };
  res.status(200).json({message:"Deleted successfully"});
    }
    catch(error){
    res.status(500).json({message:error.message});
    }
}
module.exports = { getMenuItems, getMenuItemById,getMenuItemByStatus,updateMenuItems,deleteMenuItems ,addMenuItems};
