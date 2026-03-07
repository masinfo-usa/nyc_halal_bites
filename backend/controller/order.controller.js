import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";
//import { sendConfirmationEmail } from "../utils/email.js"; // your existing email function

// Create order
export const createOrder = async (req, res) => {
  try {
    const {
      restaurantId,
      customerName,
      customerEmail,
      customerPhone,
      orderType,
      isRealOrder,
      pickupTime,
      deliveryInfo,
      items,
      pricing,
      payment,
    } = req.body;

    // 1️⃣ Find or create customer
    let customer = await Customer.findOne({ restaurantId, email: customerEmail });

    if (!customer) {
      // First-time customer
      customer = new Customer({
        restaurantId,
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        lastOrderAt: new Date(),
      });
    } else {
      // Returning customer — update if changed
      customer.name = customerName;
      customer.phone = customerPhone;
      customer.lastOrderAt = new Date();
    }

    await customer.save();





    // 2️⃣ Save order
    const order = new Order({
      restaurantId,
      customerId: customer._id,
      orderType,
      isRealOrder,
      status: "placed",
      pickupTime,
      deliveryInfo,
      items,
      pricing,
      payment,
    });

    await order.save();

    // // 3️⃣ Send confirmation email
    // await sendConfirmationEmail({ customerName, customerEmail, items, pricing, orderId: order._id });

    res.json({ success: true,  data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { orderType, status, today, isRealOrder } = req.query;

    const filter = {};
    if (orderType) filter.orderType = orderType;
    if (status) filter.status = status;


    // Handle isRealOrder (query params are strings)
    if (isRealOrder !== undefined) {
      filter.isRealOrder = isRealOrder === "true"; // convert to boolean
    }



    // Filter for today if requested
    if (today === "true") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      filter.orderedAt = { $gte: startOfDay, $lte: endOfDay };
    }

    const orders = await Order.find(filter)
      .populate("customerId")
      .populate("restaurantId");

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};



export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("customerId")
      .populate("restaurantId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // ✅ Always include success
    res.json({
      success: true,
      status: order.status,
      order, // keep full order for existing usage
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};


// PATCH /api/orders/:id
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};



export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update order" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};
