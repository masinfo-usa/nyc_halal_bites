import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Divider, Button } from "@mui/material";
import { Phone, Directions } from "@mui/icons-material";
import { FaGoogle } from 'react-icons/fa';
import { useProductStore } from "../store/product";
import { use } from "react";

const OrderPlaced = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract values passed from Checkout
  const { payment, buyer, squareCart, pickupInfo, deliveryInfo, tipPercent } = location.state || {};


  const paymentData = payment?.payment; // because your log shows payment.payment

  const customerName = buyer?.name || "Customer";
  const customerEmail = buyer?.email || "updates@mezquite-valley.com";
  const customerPhone = buyer?.phone || "(123) 456-7890"; 
  const items = squareCart || [];
  const amountPaid = Number(paymentData?.amountMoney?.amount/100); 
  const last4 = paymentData?.cardDetails?.card?.last4;
  const cardBrand = paymentData?.cardDetails?.card?.cardBrand;
  const orderId = paymentData?.orderId;

  const {fulfillmentType, deliveryAddress, unit, dropoffOption, deliveryInstruction} = useProductStore();  


  // Subtotal + Tax + Total calculation
  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price/100 || 0), 0);
  const tax = +(subtotal * 0.0825).toFixed(2); 
  const onlineOrderingPlatformFee = fulfillmentType === "delivery" ? +(subtotal * 0.08).toFixed(2) : 0; 
  const tip = +Math.round(subtotal * tipPercent / 100 * 100) / 100; 

  const total = (subtotal + tax + onlineOrderingPlatformFee + deliveryInfo?.deliveryFee + tip).toFixed(2);



  const formatDatePretty = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short", // Mon
      month: "short",   // Dec
      day: "2-digit",   // 01
    });
  };






const sentRef = useRef(false);




// useEffect(() => {
//   if (sentRef.current) return;
//     sentRef.current = true;

//   fetch('/api/order/placed', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       customerName: customerName,
//       customerEmail: customerEmail,
//       customerPhone: customerPhone,
//       restaurantName: 'Mezquite Valley Street Tacos and More',
//       address: '430 Buck Jones Rd, Raleigh, NC 27606',
//       phone: '(919) 480-6649',
//       items: items,
//       subtotal: subtotal,
//       taxes: tax,
//       tip: tip,
//       total: total,
//       pickupInfo: pickupInfo,
//       deliveryInfo: deliveryInfo,
//       fulfillmentType: fulfillmentType,
//     }),
//   });
// }, []);








  return (
    <Box sx={{ p: 3, maxWidth: 550, mx: "auto" }}>
      {/* --- Header --- */}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "green", mb: 1 }}>
        Order Placed!!
      </Typography>
      <Typography variant="h5" sx={{ mb: 2, color:"#777777ff" }}>
        Thank you, {customerName}.
      </Typography>

      {/* --- Pickup Info --- */}
    {/* --- Fulfillment Section --- */}

<Divider sx={{ my: 2 }} />

{/* Order Type Section */}
  <Typography  fontSize="1.15rem" mb={1}>
    Order Type:
  </Typography>

  <Box   sx={{
    backgroundColor: "#f5f5f5",
    px: 1,
    py: 1,
    borderRadius: 2,
    mb: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 1
  }}
>
<Box display="flex" alignItems="baseline">
  <Typography fontSize="14px" sx={{ minWidth: 60 }}>
    <strong>Type:</strong>
  </Typography>

  <Typography fontSize="16px" color="#777777ff" fontWeight="bold">
    {fulfillmentType === "pickup" ? "Pickup" : "Delivery"}
  </Typography>
</Box>

<Box display="flex" alignItems="baseline">
  <Typography fontSize="14px" sx={{ minWidth: 60 }}>
    <strong>When:</strong>
  </Typography>

<Typography fontSize="16px" color="#777777ff" fontWeight="bold">
  {fulfillmentType === "pickup"
    ? pickupInfo
      ? `${formatDatePretty(pickupInfo.date)}, ${pickupInfo.time} (approx.)`
      : "ASAP"
    : deliveryInfo
      ? `${formatDatePretty(deliveryInfo.date)}, ${deliveryInfo.time} (approx.)`
      : "ASAP"}
</Typography>

</Box>





  </Box>



<Divider sx={{ my: 3 }} />

   <Typography fontSize="1.15rem" mb={1}>
    {fulfillmentType === "pickup" ? "Pickup Location:" : "Delivery Address:"}
  </Typography>
<Box
  sx={{
    backgroundColor: "#f5f5f5",
    px: 1,
    py: 0.5,
    borderRadius: 2,
    mb: 1,
    textAlign: "left",
  }}
>


  

  {fulfillmentType === "pickup" ? (
    <>

    <Box>


        <Box mt={1}>
  <Typography fontWeight="bold">
    Mezquite Valley Street Tacos and More
  </Typography>

  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <Typography fontSize="14px" color="#777777ff">
      430 Buck Jones Rd, Raleigh, NC 27606
    </Typography>

    <Button
      variant="outlined"
      size="small"
      onClick={() =>
        window.open(
          "https://www.google.com/maps/dir/?api=1&destination=430+Buck+Jones+Rd,+Raleigh,+NC+27606"
        )
      }
      sx={{
        minWidth: "45px",
        padding: "4px 6px",
      }}
    >
      <Directions fontSize="small" />
    </Button>
  </Box>
</Box>



  
</Box>

    </>
  ) : (
    <>
      <Typography
        fontSize="14px"
        color="#777777ff"
        sx={{ mb: 0 }}
      >
        {deliveryAddress?.full}
      </Typography>

      <Typography
        fontSize="14px"
        color="#777777ff"
        sx={{ mt: 1 }}
      >
        Leave at door.
     
     </Typography>

      {/* <Typography>
        <strong>Delivery To:</strong>
      </Typography>
      <Typography
        fontSize="14px"
        color="#777777ff"
        sx={{ mb: 2 }}
      >
        {deliveryAddress?.full}
      </Typography>

      <Box
        sx={{
          backgroundColor: "#ffffff",
          p: 2,
          borderRadius: 2,
          mb: 1,
        }}
      >
        <Typography sx={{ fontSize: "1.3rem" }}>
          Delivery {formatDatePretty(deliveryInfo?.date)},
        </Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          {deliveryInfo?.time} (approx.)
        </Typography>
      </Box> */}
    </>
  )}
</Box>





<Divider sx={{ my: 3 }} />


      {/* --- Help Section --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
          <Typography fontWeight="bold">Need help with your order?</Typography>
          <Typography fontSize={`12px`}
          fontWeight="semibold"
          color="#777777ff" >
            Call Mezquite Valley at (919)-480-6649
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => (window.location.href = "tel:+19194806649")}
          sx={{ minWidth: "45px", borderRadius: 2, backgroundColor:"primary.main", color: "primary.contrastText" }}
        >
          <Phone />
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* --- Items Section --- */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Items ({items.length})
      </Typography>
      
      
      <Box sx={{ mb: 0, p:1.5, backgroundColor: '#f5f5f5', borderRadius: 2 }}>

        {items.map((item, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography fontSize={`14px`} fontWeight="semibold" color="#777777ff">{item.quantity} x {item.name}</Typography>
            <Typography fontSize={`14px`} fontWeight="semibold" color="#777777ff">${(item.quantity * item.price/100)?.toFixed(2)}</Typography>
          </Box>
        ))}
        

      {fulfillmentType === 'delivery' && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Typography fontSize={`14px`} fontWeight="semibold" color="#777777ff">1 x {deliveryInfo?.freeItemWithDelivery}</Typography>
            <Typography fontSize={`14px`} fontWeight="semibold" color="#777777ff">$0.00</Typography>
          </Box>
      )}






      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography >Paid with {cardBrand} ending in {last4}</Typography>
      <Divider sx={{ my: 2 }} />

      {/* --- Totals --- */}
      <Box sx={{ mb: 0, p:1.5, display: 'flex', flexDirection: 'column', gap: 0.5, backgroundColor: '#f5f5f5', borderRadius: 2 }}>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Subtotal: </Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography> {fulfillmentType === "delivery" ? "Taxes and fees: " : "Taxes: "} </Typography>
        <Typography>${fulfillmentType === "delivery" ? (tax + onlineOrderingPlatformFee).toFixed(2) : tax.toFixed(2)}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Tip: </Typography>
        <Typography>${tip.toFixed(2)}</Typography>
      </Box>

      {fulfillmentType === 'delivery' && (
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Delivery Charge: </Typography>
        <Typography>${deliveryInfo?.deliveryFee.toFixed(2)}</Typography>
      </Box>
      )}
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          mt: 1,
        }}
      >
        <Typography>Order Total: </Typography>
        <Typography>${total}</Typography>

      </Box>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      {/* --- Payment Info --- */}
      {/* <Typography variant="body2">Order ID: {orderId}</Typography>
      <Typography variant="body2">Amount Paid: ${amountPaid.toFixed(2)}</Typography> */}

    <Button
      fullWidth
      variant="contained"
      sx={{ 
        backgroundColor:"primary.main",
        color: 'primary.contrastText',
        fontSize: '1.0rem',
        mt: 3,
        py: 1.5, 
        borderRadius: 10, 
        boxShadow: 0,
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        gap: 1.0 // adds space between text and icon
      }}
      href="https://g.page/r/CTQGu0TQbtlHEBE/review"
      target="_blank"
      rel="noopener noreferrer" // security best practice
    >
      Review Us on Google<FaGoogle size={21} />
    </Button>


        <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ 
          mt: 3, 
          py: 1.5, 
          fontSize: '1.0rem',
          borderRadius: 10, 
          boxShadow: 0,
          backgroundColor:"#000000ff",
          textTransform: "none" }}
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/");
        }}
      >
        Back to Menu
      </Button>
    </Box>
  );
};

export default OrderPlaced;
