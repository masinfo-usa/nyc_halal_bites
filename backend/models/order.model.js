import mongoose from "mongoose";
import nodemon from "nodemon";

const orderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    note: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    /* =====================
       RELATIONS
    ====================== */
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    /* =====================
       ORDER INFO
    ====================== */
    orderType: {
      type: String,
      enum: ["pickup", "delivery"],
      required: true,
    },

    isRealOrder:{
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "placed",
        "ready",
        "out_for_delivery",
        "picked_up",
        "delivered",
        "cancelled",
      ],
      default: "placed",
      index: true,
    },

    orderedAt: {
      type: Date,
      default: Date.now,
    },
    
    pickupTime: Date,
    pickedUpAt: Date,
    

    /* =====================
       DELIVERY INFO
    ====================== */
    deliveryInfo: {
      address: {
        full: String,
        street: String,
        city: String,
        state: String,
        zip: String,
        location: {
          lat: Number,
          lng: Number,
        },
      },
      unit: String,
      dropoffOption: String,
      deliveryTime: Date,
      deliveryInstruction: String,
      deliveredAt: Date,
      freeItemWithDelivery: String,
    },

    /* =====================
       ITEMS
    ====================== */
    items: [orderItemSchema],

    /* =====================
       PRICING (YOUR SYSTEM)
    ====================== */
    pricing: {
      subtotal: Number,
      tax: Number,
      deliveryFee: Number,
      onlineOrderingPlatformFee: Number,
      tipAmount: Number,
      total: Number,
    },

    /* =====================
       PAYMENT (PROVIDER-AGNOSTIC)
    ====================== */
    payment: {
      provider: {
        type: String,
        enum: ["square", "stripe"],
        default: "square",
      },



      transactionId: String, // Square payment.id
      providerOrderId: String, // Square payment.orderId
      receiptUrl: String,
      receiptNumber: String,

      sourceType: String, // CARD
      currency: String,



      card: {
        brand: String,
        last4: String,
        cardType: String,
      },

    },
  },
  {
    timestamps: true,
  }
);

/* =====================
   INDEXES
===================== */
orderSchema.index({ restaurantId: 1, createdAt: -1 });
orderSchema.index({ "delivery.driverId": 1 });
orderSchema.index({ "payment.status": 1 });

const Order = mongoose.model("Order", orderSchema);

export default Order;
