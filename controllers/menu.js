const Menu = require("../models/menu");

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(menuItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMenuItemByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const menuItems = await Menu.find({ status });
    return res.status(200).json(menuItems);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addMenuItems = async (req, res) => {
  try {
    const { name, category, money, orderNumber, status, timeOrdered } = req.body;
    const newMenuItem = new Menu({
      name,
      category,
      money,
      orderNumber,
      status,
      timeOrdered,
    });
    const savedItem = await newMenuItem.save();
    return res.status(201).json(savedItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateMenuItems = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    return res.status(200).json(menuItem);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteMenuItems = async (req, res) => {
  try {
    const deletedItem = await Menu.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  getMenuItemByStatus,
  updateMenuItems,
  deleteMenuItems,
  addMenuItems,
};

