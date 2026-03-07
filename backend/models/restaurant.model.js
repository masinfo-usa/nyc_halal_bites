import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
    },



    
    isPickupEnabled: {
      type: Boolean,
      default: true,
    },

    isDeliveryEnabled: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
