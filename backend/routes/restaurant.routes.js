import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../controller/restaurant.controller.js";

const router = express.Router();

router.get("/", getAllRestaurants);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
