import mongoose from "mongoose";
import Restaurant from "../models/restaurant.model.js";

/**
 * @desc   Create a new restaurant
 * @route  POST /api/restaurants
 */
export const createRestaurant = async (req, res) => {
  try {
    const {
      name,
      slug,
      phone,
      address,
      isPickupEnabled,
      isDeliveryEnabled,
    } = req.body;

    if (!name || !slug || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, slug, and phone are required",
      });
    }

    const existing = await Restaurant.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Restaurant with this slug already exists",
      });
    }

    const restaurant = await Restaurant.create({
      name,
      slug,
      phone,
      address,
      isPickupEnabled,
      isDeliveryEnabled,
    });

    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    console.error("Create restaurant error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc   Get all restaurants
 * @route  GET /api/restaurants
 */
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc   Update restaurant
 * @route  PUT /api/restaurants/:id
 */
export const updateRestaurant = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid restaurant id",
    });
  }

  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRestaurant,
    });
  } catch (error) {
    console.error("Update restaurant error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * @desc   Delete restaurant
 * @route  DELETE /api/restaurants/:id
 */
export const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid restaurant id",
    });
  }

  try {
    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Restaurant deleted",
    });
  } catch (error) {
    console.error("Delete restaurant error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
