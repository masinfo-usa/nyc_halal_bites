import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
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

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true, // allows multiple null emails
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional: track last order
    lastOrderAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);



// Optional: avoid duplicate emails per restaurant (if email is provided)
customerSchema.index(
  { restaurantId: 1, email: 1 },
  { unique: true, sparse: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
