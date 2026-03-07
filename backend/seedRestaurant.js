import dotenv from "dotenv";

dotenv.config();


import { connectDB } from "./config/db.js";
import Restaurant from "./models/restaurant.model.js";


const seedRestaurant = async () => {
  try {
    await connectDB();

    const existing = await Restaurant.findOne({
      slug: "mezquite-valley",
    });

    if (existing) {
      console.log("Restaurant already exists");
      process.exit(0);
    }

    await Restaurant.create({
      name: "Mezquite Valley Grill",
      slug: "mezquite-valley",
      phone: "919-555-1234",
      isPickupEnabled: true,
      isDeliveryEnabled: true,
      address: {
        street: "123 Main St",
        city: "Raleigh",
        state: "NC",
        zip: "27601",
      },
    });

    console.log("Restaurant seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedRestaurant();
