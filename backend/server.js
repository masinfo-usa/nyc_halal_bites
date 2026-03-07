import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Square from "square";
import path from "path";
import jwt from "jsonwebtoken";
import sgMail from '@sendgrid/mail';
import { sendConfirmationEmail } from './utils/sendConfirmationEmail.js';
import { connectDB } from "./config/db.js";
import restaurantRoutes from "./routes/restaurant.routes.js"
import customerRoutes from "./routes/customer.routes.js";
import orderRoutes from "./routes/order.routes.js";


dotenv.config();


const __dirname = path.resolve();
const app = express();


app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mezquite-valley.onrender.com",
    "https://mezquite-valley-gyc6.onrender.com",
    "https://mezquite-valley.com",
    "https://www.mezquite-valley.com"
  ],
}));


app.use(express.json());

app.use("/api/restaurants", restaurantRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

app.post("/api/staff/login", (req, res) => {
  const { pin } = req.body;
  if (pin !== process.env.STAFF_PIN) {
    return res.status(401).json({ message: "Invalid PIN" });
  }
  const token = jwt.sign({ role: "staff" }, process.env.STAFF_JWT_SECRET, { expiresIn: "10s" });
  res.json({ token });
});




if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const { SquareClient, SquareEnvironment } = Square;

const client = new SquareClient({
  environment: process.env.SQUARE_ENV === "sandbox"
    ? SquareEnvironment.Sandbox
    : SquareEnvironment.Production,
    
  token: process.env.SQUARE_ENV === "sandbox"
    ? process.env.SQUARE_ACCESS_TOKEN_SANDBOX
    : process.env.SQUARE_ACCESS_TOKEN_PROD
    
});

const paymentsApi = client.payments;
const ordersApi = client.orders;




const buildFulfillment = ({ fulfillmentType, customer, delivery }) => {
  if (fulfillmentType === "delivery") {
    return [{
      type: "DELIVERY",
      state: "PROPOSED",
      deliveryDetails: {
        recipient: {
        address: {
          addressLine1: delivery.address?.street,
          addressLine2: delivery.unit,
          locality: delivery.address?.city,
          administrativeDistrictLevel1: delivery.address?.state,
          postalCode: delivery.address?.zip,
          country: "US",
        },
          displayName: customer.name,
          phoneNumber: customer.phone,
          emailAddress: customer.email,
        },
       
        note: delivery.freeItemWithDelivery ? ("1 x " + delivery.freeItemWithDelivery + " (Free)") : "No free item" ,
        scheduleType: "ASAP",
      },
    }];
    
  }

  // default PICKUP
  return [{
    type: "PICKUP",
    state: "PROPOSED",
    pickupDetails: {
      recipient: {
        displayName: customer.name,
        phoneNumber: customer.phone,
        emailAddress: customer.email,
      },
      scheduleType: "ASAP",
    },
  }];
};



// Create payment route
app.post("/api/pay", async (req, res) => {

  console.log("Incoming request body:", req.body);

  try {


    const { nonce, squareCart, customer, tipPercent, 
      checkoutID, fulfillmentType, delivery, onlineOrderingPlatformFee } = req.body;


    const subtotal = squareCart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const taxRate = 0.0825;
    const tax = subtotal * taxRate;

    const tipAmount = subtotal * (tipPercent / 100);

    const totalAmount = subtotal + tax + tipAmount;



    // Create an order with your cart items
    const order = await ordersApi.create({
      order: {
        locationId: process.env.SQUARE_ENV === "sandbox"
                  ? process.env.SQUARE_LOCATION_ID_SANDBOX
                  : process.env.SQUARE_LOCATION_ID_PROD,
        note: `Testing order note`,
        lineItems: squareCart.map(item => ({
          name: item.name,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(Math.round(item.price)), // cents
            currency: "USD"
          },
          note: item.note
        })),
        fulfillments: buildFulfillment({
          fulfillmentType,
          customer,
          delivery,
        }),


        
      taxes: [
              {
              name: "NC&W/C sale taxes ",
              type: "ADDITIVE",  
              percentage: "8.25",
          //    scope: "LINE_ITEM"

              }
          ],
      tip_money: {
          amount: BigInt(Math.round(tipAmount)),
          currency: "USD"
        },
      serviceCharges: fulfillmentType === "delivery"
      ? [{
          name: "Delivery Fee",
          amountMoney: {
            amount: BigInt(Math.round(delivery.fee * 100) ),
            currency: "USD",
          },
          calculationPhase: "TOTAL_PHASE",
          taxable: false,
        },
        {
          name: "Online Ordering Platform",
          amountMoney: {
            amount: BigInt(Math.round(onlineOrderingPlatformFee * 100) ),
            currency: "USD",
          },
          calculationPhase: "TOTAL_PHASE",
          taxable: false,
        },
      ]
      : [],
      
      }
    });




    // const subtotal = squareCart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    // const taxRate = 0.0825;
    // const totalAmount = subtotal + subtotal * taxRate;
    





    // Process payment
    const payment = await paymentsApi.create({
      sourceId: nonce,
      idempotencyKey: checkoutID,
      amountMoney: order.order.totalMoney,
      tipMoney: {
        amount: BigInt(Math.round(tipAmount)),
        currency: "USD"
      },

      orderId: order.order.id,
      locationId: process.env.SQUARE_ENV === "sandbox"
                  ? process.env.SQUARE_LOCATION_ID_SANDBOX
                  : process.env.SQUARE_LOCATION_ID_PROD,
    });

    // res.json({ success: true, message: "Payment successful!", payment });




    console.log(
      JSON.stringify(
        payment,
        (key, value) => (typeof value === "bigint" ? value.toString() : value),
        2
      )
    );


    res.json({
      success: true,
      message: "Payment successful!",
      payment: JSON.parse(
        JSON.stringify(payment, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      )
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});







app.post("/api/squareorders", async (req, res) => {
  // pulling orders from square api
 // console.log("Incoming request squareorders:", req.body);

  try {
    // const response = await ordersApi.search({
    //   locationIds: [process.env.SQUARE_LOCATION_ID_PROD],
    //   query: {
    //     filter: {
    //       sourceFilter: {
    //         sourceNames: ["Website Orders"],
    //       },
    //     },
    //   },
    // });





// const response = await ordersApi.search({
//   locationIds: [process.env.SQUARE_LOCATION_ID_PROD],
//   orderId: "2ZRY4U7f6S0PvPLLhoNW1URznVEZY",
    
// });

const response = await ordersApi.search({
  locationIds: [process.env.SQUARE_LOCATION_ID_PROD],
  query: {
    filter: {
      // stateFilter: {
      //   states: ["COMPLETED"], // fetch only relevant states
      // },

      fulfillmentFilter: {
          fulfillmentStates: [
              "COMPLETED",
          ],
      },


      sourceFilter: {
        sourceNames: ["Website Orders"],
      },

    },
  },
  
  limit: 1000,
});

//console.log("Square Orders API response:", response);








    // response.result.orders may be undefined if no orders
    const orders = response.orders || [];




    const paidOrders = orders.filter(
      (order) =>
        (order.state === "COMPLETED" || order.state === "OPEN") &&
        parseInt(order.netAmountDueMoney?.amount || 0) === 0
    );







    // Convert BigInt to string if needed
    const safeOrders = JSON.parse(
      JSON.stringify(orders, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    res.json(safeOrders); // return array directly


    // console.log(
    //   JSON.stringify(
    //     safeOrders,
    //     (key, value) => (typeof value === "bigint" ? value.toString() : value),
    //     2
    //   )
    // );



  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});







app.post("/api/retrievesquareorder", async (req, res) => {
  try {
    const { orderId } = req.body; // 👈 grab it from request body

    if (!orderId) {
      return res.status(400).json({ success: false, message: "orderId is required" });
    }

    const response = await client.orders.get({
      orderId, // 👈 use dynamic value instead of hardcoded
    });
    // Spread the response to get the plain data out
    const sanitized = JSON.parse(
      JSON.stringify({ ...response }, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    console.log("Order Retrieved:", JSON.stringify(sanitized, null, 2)); // 👈 prints full nested object
    res.json(sanitized);

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});


app.post("/api/updateorderstatus", async (req, res) => {
  try {
    const { orderId, state } = req.body;

    if (!orderId || !state) {
      return res.status(400).json({ success: false, message: "orderId and state are required" });
    }

    const validStates = ["PROPOSED", "RESERVED", "PREPARED", "COMPLETED", "CANCELED"];
    if (!validStates.includes(state)) {
      return res.status(400).json({ success: false, message: `Invalid state. Must be one of: ${validStates.join(", ")}` });
    }

    // Step 1: Retrieve current order
    const retrieveResponse = await client.orders.get({ orderId });

    const sanitize = (obj) =>
      JSON.parse(
        JSON.stringify({ ...obj }, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );

    const order = sanitize(retrieveResponse).order;
    const { locationId, version, fulfillments } = order;
    const fulfillment = fulfillments[0];

    // Step 2: Determine order-level state
    // COMPLETED/CANCELED = set order state too, otherwise keep order OPEN
    const isTerminal = state === "COMPLETED" || state === "CANCELED";

    const updatePayload = {
      orderId,
      order: {
        locationId,
        version: version,
        ...(isTerminal && { state }), // 👈 only set order state for COMPLETED or CANCELED
        fulfillments: [
          {
            uid: fulfillment.uid,
            type: fulfillment.type,
            state, // 👈 always update fulfillment state
            deliveryDetails: fulfillment.deliveryDetails,
          },
        ],
      },
    };

    const updateResponse = await client.orders.update(updatePayload);

    const sanitized = sanitize(updateResponse);
    console.log(`Order ${orderId} updated to ${state}:`, JSON.stringify(sanitized, null, 2));
    res.json({ success: true, order: sanitized });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});



app.post('/api/order/sendemails', async (req, res) => {
  try {
    await sendConfirmationEmail(req.body);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed' });
  }
});




app.post('/api/order/create', async (req, res) => {
  try {
    const orderData = req.body;

    // Save to DB
    const order = new Order(orderData);
    await order.save();

    // Optionally send confirmation email
    await sendConfirmationEmail(orderData);

    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save order' });
  }
});










app.listen(5000, () => {
  connectDB();
  console.log("Server running on http://localhost:5000");
});
