import express from "express";

import{
 getMenuItems, 
 getMenuItemById,
 getMenuItemByStatus,
 updateMenuItems,
 deleteMenuItems ,
 addMenuItems
} from '../controllers/menu';

const router = express.Router();
router.get('/menu',getMenuItems);
router.get('/menu/:id',getMenuItemById);
router.get('/menu:status',getMenuItemByStatus);
router.post('/menu',addMenuItems);
router.patch('/menu',updateMenuItems);
router.delete('/menu',deleteMenuItems)

export  default router;