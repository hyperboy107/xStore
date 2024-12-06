import express from "express";
const router = express.Router();
import { createOrder, getAllOrders, getUserOrder, totalOrders, totalSales, totalSalesByDate, findById, markOrderAsPay, markOrderAsDeliver } from "../controllers/orderController.js";
import {authhenticate, authorizedAdmin} from '../middlewares/authMiddleware.js'

router.route('/').post(authhenticate, createOrder).get(authhenticate, authorizedAdmin, getAllOrders);
router.route('/mine').get(authhenticate, getUserOrder);
router.route('/total-orders').get(authhenticate,authorizedAdmin, totalOrders)
router.route('/total-sales').get(totalSales)
router.route('/total-sales-bydate').get(totalSalesByDate)
router.route('/:id').get(authhenticate, findById)
router.route('/:id/pay').put(authhenticate, markOrderAsPay)
router.route('/:id/deliver').put(authhenticate, authorizedAdmin, markOrderAsDeliver)
export default router;