import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      index: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate menu items per restaurant
menuItemSchema.index(
  { restaurantId: 1, name: 1 },
  { unique: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
