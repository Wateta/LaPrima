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
router.post("/menu", authenticate, adminOnly, addMenuItems);
router.patch("/menu/:id", authenticate, adminOnly, updateMenuItems);
router.delete("/menu/:id", authenticate, adminOnly, deleteMenuItems);

module.exports = router;
