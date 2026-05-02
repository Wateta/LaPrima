const express = require("express");
const { authenticate, adminOnly } = require("../authentication_Mongo/middleware/auth.middleware");
const {
  getMenuItems,
  getMenuItemById,
  getMenuItemByStatus,
  addMenuItems,
  updateMenuItems,
  deleteMenuItems,
} = require("../controllers/menu");

const router = express.Router();
router.get("/menu", getMenuItems);
router.get("/menu/:id", getMenuItemById);
router.get("/menu/status/:status", getMenuItemByStatus);
router.post("/menu", authenticate, addMenuItems);
router.patch("/menu/:id", authenticate, updateMenuItems);
router.delete("/menu/:id", authenticate, deleteMenuItems);

module.exports = router;
