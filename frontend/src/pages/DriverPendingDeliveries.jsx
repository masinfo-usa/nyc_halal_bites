import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Button,
  Drawer,
  Divider,
  Switch,
  Container
} from "@mui/material";

import {
  Map,
  Marker
} from "@vis.gl/react-google-maps";

import RefreshIcon from '@mui/icons-material/Refresh';

import MezquiteLocationLogo from "../images/MezquiteLocationLogo.png";
import SwipeToDeliver from "../components/SwipeToDeliver";



const DriverPendingDeliveries = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // map | list
  const [showCompleted, setShowCompleted] = useState(false);

  const [now, setNow] = useState(Date.now());

  const STORE_LOCATION = {
  lat: 35.7766,
  lng: -78.7335,
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "/api/orders?orderType=delivery&today=false&isRealOrder=true"
      );

      const ordersWithCustomer = res.data.map(order => ({
        ...order,
        customerName: order.customerId?.name || "Unknown",
        customerPhone: order.customerId?.phone || "",
      }));

    //  console.log("Fetched orders:", ordersWithCustomer);
      setOrders(ordersWithCustomer);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000); // update every 60 seconds

    return () => clearInterval(interval);
  }, []);




  const openMaps = (address) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      "_blank"
    );
  };

  const callCustomer = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const textCustomer = (phone) => {
    const message = encodeURIComponent("Mezquite Valley here. Your order is delivered. Thank you! Please review us on google if you like our food: https://g.page/r/CTQGu0TQbtlHEBE/review");
    window.location.href = `sms:${phone}?body=${message}`;
  };


  const getTimeColor = (minutes) => {
    if (minutes <= 10) return "success.main";   // green
    if (minutes <= 20) return "warning.main";   // orange
    return "error.main";                        // red
  };

  const getDeliveryTimeColor = (deliveryTime, now) => {
    return now > new Date(deliveryTime).getTime()
      ? "error.main"
      : "text.primary";
  };



  const retreiveOrder = async (orderId) => {
    try {
      const response = await axios.post("/api/retrievesquareorder", { orderId });
    //  console.log("Order Retrieved:", response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to retrieve order:", err);
      return null;
    }
  };



const updateOrderStatus = async (orderId, state) => {
  try {
    const response = await axios.post("/api/updateorderstatus", { orderId, state });
  //  console.log(`Order updated to ${state}:`, response.data);
    return response.data;
  } catch (err) {
    console.error("Failed to update order status:", err);
    return null;
  }
};

  const updateStatus = async (orderId, payload) => {
    await axios.patch(`/api/orders/${orderId}`, payload);

  const squareStateMap = {
    "out_for_delivery": "PREPARED",
    "delivered": "COMPLETED",
  };

  const squareState = squareStateMap[payload.status];

  if (squareState && orderId) {
  //  console.log(`Updating Square order ${orderId} to state ${squareState}`);
    await updateOrderStatus(selectedOrder?.payment?.providerOrderId, squareState);
  }


    fetchOrders();
    setSelectedOrder(null);
  };

  const formatDuration = (start, end) => {
    if (!start || !end) return "-";

    const diffMs = new Date(end) - new Date(start); // difference in milliseconds
    const diffMins = Math.floor(diffMs / 60000); // total minutes

    if (diffMins < 60) return `${diffMins} mins`;

    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours} hr ${minutes} mins`;
  };

  const pendingOrders = orders.filter(o => o.status !== "delivered");

  const deliveredOrders = orders
    .filter(o => o.status === "delivered")
    .sort(
      (a, b) =>
        new Date(b.orderedAt) -
        new Date(a.orderedAt)
    );

  const groupedOrders = useMemo(() => {
    return deliveredOrders.reduce((acc, order) => {
      const date = new Date(order.orderedAt);
      const day = date.toLocaleDateString("en-GB", { day: "2-digit" });
      const month = date.toLocaleDateString("en-GB", { month: "short" });
      const year = date.toLocaleDateString("en-GB", { year: "numeric" });
      const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });

      const dateKey = `${day} ${month} ${year} - ${weekday}`;

      if (!acc[dateKey]) {
        acc[dateKey] = { orders: [], total: 0 };
      }

      acc[dateKey].orders.push(order);
      acc[dateKey].total += order.pricing.total;

      return acc;
    }, {});
  }, [deliveredOrders]);

  const summary = useMemo(() => {
    const startDate = new Date("2026-02-10");
    const now = new Date();

    const diffInDays = Math.max(1, Math.floor((now - startDate) / (1000 * 60 * 60 * 24)));
    const diffInMonths = Math.max(
      1,
      (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth())
    );

    const totals = deliveredOrders.reduce((acc, order) => {
      acc.totalOrders += 1;
      acc.totalSales += order.pricing?.total || 0;
      acc.totalWithoutTax += order.pricing?.subtotal || 0;
      acc.totalTax += order.pricing?.tax || 0;
      acc.totalDiscounts += order.pricing?.discount || 0;
      acc.totalTips += order.pricing?.tipAmount || 0;
      acc.totalDeliveryFee += order.pricing?.deliveryFee || 0;
      acc.totalPlatformFee += order.pricing?.onlineOrderingPlatformFee || 0;
      return acc;
    }, {
      totalOrders: 0,
      totalSales: 0,
      totalWithoutTax: 0,
      totalTax: 0,
      totalDiscounts: 0,
      totalTips: 0,
      totalDeliveryFee: 0,
      totalPlatformFee: 0,
    });

    totals.avgSalePerDay = totals.totalSales / diffInDays;
    totals.avgSalePerMonth = totals.totalSales / diffInMonths;
    totals.avgOrdersPerDay = totals.totalOrders / diffInDays;
    totals.avgOrdersPerMonth = totals.totalOrders / diffInMonths;

    return totals;
  }, [deliveredOrders]);

  return (
    <>

         <Box sx={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '80px', backgroundColor: '#000', justifyContent:'space-between', display:'flex', alignItems:'center', mb: 0, px: 2}}
           >
             <Typography onClick={()=> navigate("/staff/admin")} 
             sx={{color:'#fff', fontWeight:'bold', backgroundColor:'primary.main', px:1, py:0.5, borderRadius: 1}}> Show Pickups </Typography>
             
 
            
            <Button
              variant="outlined"
              sx={{ my: 1, ml: 1, backgroundColor: 'primary.main', color: 'primary.contrastText' }}
              onClick={fetchOrders}
            >
              <RefreshIcon />
            </Button>

           </Box>

    <Container sx={{ mt: '80px', mb: 5, backgroundColor: "#ffffffff", width: { xs: "100%", md: "100%", lg: "40%", xl: "40%" } }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2} 
      sx={{mx: -2, px:2, 
          backgroundColor:'#444',
          border: '2px solid #000',
          alignItems: 'center'}}>
        <Typography  variant="h5" sx={{mx: -2, my: 1, px:2, color:'#fff'}}>Pending Deliveries</Typography>
        <Button
          variant="outlined"
          sx={{ my: 1, backgroundColor: 'primary.main', color:'primary.contrastText'}}
          onClick={() =>
            setViewMode(v => (v === "map" ? "list" : "map"))
          }
        >
          {viewMode === "map" ? "View List" : "View Map"}
        </Button>



      </Box>

      {/* 🗺️ MAP VIEW */}
      {viewMode === "map" && (
          <Map
            center={STORE_LOCATION}
            zoom={12}
            style={{ height: "70vh", width: "100%" }}
          >
            {/* Store Marker */}
            {window.google && (
              <Marker
                position={STORE_LOCATION}
                title="Store"
                icon={{
                  url: MezquiteLocationLogo,
                  scaledSize: new window.google.maps.Size(36, 36),
                  anchor: new window.google.maps.Point(18, 36),
                }}
              />
            )}

            {/* Delivery Markers */}
            {pendingOrders.map((order, index) => {
              const loc = order.deliveryInfo?.address?.location;
              if (!loc) return null;

              return (
                <Marker
                  key={order._id}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  label={`${index + 1}`}
                  onClick={() => setSelectedOrder(order)}
                />
              );
            })}
          </Map>
      )}





        {viewMode === "list" && (
          <>
            {pendingOrders.length < 1 ? (
              <Typography variant="h6" sx={{ mt: 3, mb: 1, color:'#555', textAlign:'center' }}>
                - No delivery orders for now -
              </Typography>
            ) : (
              /* render delivered orders here */
              null
            )}
          </>
        )}



      {/* 📋 LIST VIEW */}
      {viewMode === "list" &&
        pendingOrders.map((order, index) => {

        const placedAt = new Date(order.orderedAt);
        const minutesAgo = Math.floor((now - placedAt.getTime()) / 60000);


        return (
          <Box
            key={order._id}
            p={2}
            mb={2}
            borderRadius={2}
            boxShadow={0}
            onClick={() => setSelectedOrder(order)}
            sx={{ cursor: "pointer", border: '1px solid #777'}}
          >
            {/* Top row: index + name | total */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold" fontSize="1.1rem">
                {index + 1}. {order.customerName}
              </Typography>

              <Typography fontWeight="bold" fontSize="1.1rem">
                ${order.pricing.total.toFixed(2)}
              </Typography>
            </Box>


            {/* Status */}
            <Box display="flex" gap={1} mt={1} alignItems={"center"}>
              <Typography fontSize={12} color="text.secondary">
                Status:
              </Typography>
              <Typography fontWeight="bold" textTransform="capitalize">
                {order.status}
              </Typography>
            </Box>

            {/* Order placed */}
            <Box display="flex" gap={1} alignItems={"center"}>
              <Typography fontSize={12} color="text.secondary">
                Order Placed:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize="1.10rem"
                sx={{ color: getTimeColor(minutesAgo) }}
              >
              
              
                {minutesAgo < 2 ? "Just now" : `${minutesAgo} mins ago`}
              
              </Typography>
            </Box>

            {/* Deliver by */}
            <Box display="flex" gap={1} alignItems={"center"}>
              <Typography fontSize={12} color="text.secondary">
                Deliver By:
              </Typography>
              <Typography
                fontWeight="bold"
                sx={{ color: getDeliveryTimeColor(order.deliveryInfo.deliveryTime, now) }}
              >
                {new Date(order.deliveryInfo.deliveryTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>


          </Box>
        );
      })
      
      
      
      }


    {viewMode === "list" && (
      <>
        {/* <Divider sx={{ mt: 5 }} /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 5,
            mb: showCompleted ? 2 : 6,
            py: 1,
            mx: -2, px:2, backgroundColor:'#444',
            border: '2px solid #000'
          }}
          onClick={() => setShowCompleted(v => !v)}
        >
          <Typography variant="h5" color="#fff">Completed Deliveries</Typography>

          <Switch
            checked={showCompleted}
           // onChange={() => setShowCompleted(v => !v)}
            inputProps={{ "aria-label": "Toggle completed orders" }}
          />
        </Box>

        {showCompleted && deliveredOrders.length < 1 && (
          <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
            No orders delivered today
          </Typography>
        )}

        {showCompleted && deliveredOrders.length > 0 && (
          <Box p={3} mb={3} borderRadius={2} sx={{ backgroundColor: "#f5f5f5", border: "1px solid #ccc" }}>
            <Typography fontWeight="bold" fontSize="1.2rem" mb={2}>
              Website Summary since Feb, 10th, 2026
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Delivery Orders:</Typography>
              <Typography fontWeight="bold">{summary.totalOrders}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Sales</Typography>
              <Typography fontWeight="bold">{summary.totalSales.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total without Tax:</Typography>
              <Typography fontWeight="bold">{summary.totalWithoutTax.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Tax:</Typography>
              <Typography fontWeight="bold">{summary.totalTax.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Discounts:</Typography>
              <Typography fontWeight="bold">{summary.totalDiscounts.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Tips:</Typography>
              <Typography fontWeight="bold">{summary.totalTips.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Delivery Fee:</Typography>
              <Typography fontWeight="bold">{summary.totalDeliveryFee.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography>Total Online Ordering Platform Fee:</Typography>
              <Typography fontWeight="bold">{summary.totalPlatformFee.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography>Avg Sale Per Day:</Typography>
              <Typography fontWeight="bold">{summary.avgSalePerDay.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Avg Sale Per Month:</Typography>
              <Typography fontWeight="bold">{summary.avgSalePerMonth.toFixed(2)} USD</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography>Avg Orders Per Day:</Typography>
              <Typography fontWeight="bold">{summary.avgOrdersPerDay.toFixed(2)}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Typography>Avg Orders Per Month:</Typography>
              <Typography fontWeight="bold">{summary.avgOrdersPerMonth.toFixed(2)}</Typography>
            </Box>
          </Box>
        )}
      </>
    )}

    {(viewMode === "list" && showCompleted) &&
      Object.entries(groupedOrders).map(([date, data]) => (
        <Box key={date} mb={3}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
            sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', px: 2, py: 1, borderRadius: 0 }}
          >
            <Typography fontWeight="bold" fontSize="1rem">
              {date} ({data.orders.length} Orders)
            </Typography>
            <Typography fontWeight="bold" fontSize="1rem">
              ${data.total.toFixed(2)}
            </Typography>
          </Box>

          {data.orders.map((order) => (
            <Box
              key={order._id}
              p={2}
              mb={2}
              borderRadius={2}
              boxShadow={0}
              onClick={() => setSelectedOrder(order)}
              sx={{ cursor: "pointer", backgroundColor: '#f8f8f8', border: '1px solid #999' }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold" fontSize="1.1rem" color="#555">
                  {order.customerName}
                </Typography>
                <Typography fontWeight="bold" fontSize="1.1rem" color="#555">
                  ${order.pricing.total.toFixed(2)}
                </Typography>
              </Box>

              <Box display="flex" gap={1} mt={1} alignItems="center">
                <Typography fontSize={12} color="text.secondary">Delivered At:</Typography>
                <Typography fontWeight="bold" sx={{ color: "#555" }}>
                  {new Date(order.deliveryInfo.deliveredAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>

              <Box display="flex" gap={1} alignItems="center">
                <Typography fontSize={12} color="text.secondary">Delivered in:</Typography>
                <Typography fontWeight="bold" sx={{ color: "#555" }}>
                  {formatDuration(order.orderedAt, order.deliveryInfo.deliveredAt)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ))}



      {/* 📦 ORDER DRAWER */}
      <Drawer
        anchor="bottom"
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      >
        {selectedOrder && (
          <Box p={3}>
            <Typography variant="h6" fontWeight="bold">
              {selectedOrder.customerName} - ${selectedOrder.pricing.total.toFixed(2)}
            </Typography>

           <Typography fontSize={14} color="#555">
            {selectedOrder.items.map((i, index) => (
              <span key={index}>
                {i.quantity} x {i.name}
                <br />
              </span>
            ))}
          </Typography>
          
          {selectedOrder?.deliveryInfo?.freeItemWithDelivery  && (
            <Typography fontSize={14} color="#555">
              {1} x {selectedOrder?.deliveryInfo?.freeItemWithDelivery} (Free)
          </Typography>
          )}
            <Divider sx={{ my: 2 }} />

            <Typography>
              {selectedOrder.deliveryInfo.address.full},{" "}
              {selectedOrder.deliveryInfo.unit}
            </Typography>
            <Typography>
              {selectedOrder.deliveryInfo.dropoffOption}
            </Typography>
            <Typography color="#555">
              {selectedOrder.deliveryInfo.deliveryInstruction}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button
                variant="outlined"
                onClick={() =>
                  openMaps(selectedOrder.deliveryInfo.address.full)
                }
              >
                Navigate
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  callCustomer(selectedOrder.customerPhone)
                }
              >
                Call
              </Button>
              <Button
                variant="outlined"
                onClick={() =>
                  textCustomer(selectedOrder.customerPhone)
                }
              >
                Text
              </Button>


              {/* <Button
                variant="outlined"
                sx={{ my: 1, ml: 1, backgroundColor: 'primary.main', color: 'primary.contrastText' }}
                onClick={() => retreiveOrder(selectedOrder?.payment?.providerOrderId)}
              >
                Retreive Order 
              </Button> */}

           
            
            </Box>

            <Divider sx={{ my: 2 }} />

            
            {
              selectedOrder.status !== 'delivered' ? (
                <>


            {
             selectedOrder.status === 'placed' 
             ? 
            // <Button
            //   fullWidth
            //   variant="contained"
            //   sx={{ mb: 0, minHeight: '50px', backgroundColor: 'orange' }}
            //   onClick={() =>
            //     updateStatus(selectedOrder._id, {
            //       status: "out_for_delivery",
            //     })
            //   }
            // >
            //   Out for delivery
            // </Button>


                  <SwipeToDeliver
                    onComplete={() =>
                      updateStatus(selectedOrder._id, {
                        status: "out_for_delivery",
                      })
                    }
                    
                    swipeText= "Out for delivery"
                    buttonBg={"linear-gradient(145deg, #ffd000, #e6bc05)"}

                  />
             :   


                  <SwipeToDeliver
                    onComplete={() =>
                      updateStatus(selectedOrder._id, {
                        status: "delivered",
                        "deliveryInfo.deliveredAt": new Date(),
                      })
                    }
                    swipeText="Mark as delivered"
                    buttonBg={"linear-gradient(145deg, #4caf50, #2e7d32)"}

                  />


            }




                </>
              ) 
              : (
                <>
                <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={() =>
                      setSelectedOrder(null)
                    }
                    sx={{my: 2}}
                  >
                    Ok
                  </Button>

                  {/* <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={() =>
                      setSelectedOrder(null)
                    }
                  >
                    Update State to Completed
                  </Button> */}




                </>                
              )

            }




          </Box>
        )}
      </Drawer>
    </Container>

    </>
  );
};

export default DriverPendingDeliveries;
