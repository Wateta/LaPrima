import express from "express";

import{
 getOAllOrders, 
  getOdersById,
 getOrderByStatus,
 addOrder,
 updateOrder ,
 deleteOrder
} from '../controllers/menu';

const router = express.Router();
router.get('/menu',getOAllOrders);
router.get('/menu/:id',getOrdersById);
router.get('/menu:status',getMenuItemByStatus);
router.post('/menu',addMenuItems);
router.patch('/menu',updateMenuItems);
router.delete('/menu',deleteMenuItems)

export  default router;
