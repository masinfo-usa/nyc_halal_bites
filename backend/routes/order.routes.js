import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controller/order.controller.js";

const router = express.Router();

// CRUD for orders
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id", updateOrder); // ✅ PATCH route
router.put("/:id/status", updateOrderStatus); // Only update order status
router.delete("/:id", deleteOrder);

export default router;
