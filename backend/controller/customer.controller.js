import Customer from "../models/customer.model.js";

// Create a customer
export const createCustomer = async (req, res) => {
  try {
    const { restaurantId, name, email, phone } = req.body;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "restaurantId is required",
      });
    }

    // One customer per restaurant + email
    let existingCustomer = await Customer.findOne({
      restaurantId,
      email,
    });

    if (existingCustomer) {
      return res.json({
        success: true,
        customer: existingCustomer,
        message: "Customer already exists",
      });
    }

    const customer = await Customer.create({
      restaurantId,
      name,
      email,
      phone,
    });

    res.json({ success: true, customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create customer",
    });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch customers" });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch customer" });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, customer });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update customer" });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ success: false, message: "Customer not found" });
    res.json({ success: true, message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete customer" });
  }
};
