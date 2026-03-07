import { useState, useRef, useEffect } from "react";
import {
  PaymentForm,
  CreditCard,
  GooglePay,
  ApplePay,
  CashAppPay,
} from "react-square-web-payments-sdk";
import { useProductStore } from "../store/product";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Container
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { Backdrop, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";


import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import TermsAgreement from "../components/TermsAgreement"; // path to your component
import FulfillmentPanel from "../components/FulfillmentPanel";
import CustomAlert from "../components/CustomAlert";



const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
};


export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, title: "", message: "", onClick: null });

  const [tipPercent, setTipPercent] = useState(10); // default 10%
  
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);


  const isProduction = import.meta.env.VITE_SQUARE_ENV === 'production';

  const appId = isProduction 
    ? import.meta.env.VITE_SQUARE_APP_ID_PROD 
    : import.meta.env.VITE_SQUARE_APP_ID_SANDBOX;

  const locationId = isProduction 
    ? import.meta.env.VITE_SQUARE_LOCATION_ID_PROD 
    : import.meta.env.VITE_SQUARE_LOCATION_ID_SANDBOX;
  

  const { cartItems, clearCart, fulfillmentType, deliveryAddress, unit, dropoffOption, deliveryInstruction, 
    freeItemWithDelivery, calculateTotalPrice, deliveryEtaDuration } = useProductStore();
  const { createOrder,  } = useProductStore();
  const isStoreOpen = useProductStore((state) => state.isStoreOpen);

  const squareCart = cartItems.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.price * 100,
    quantity: item.quantity,
    note: item.note || "",
  }));

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");



  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  }); 


    const subtotal = squareCart.reduce((total, item) => total + item.price * item.quantity,  0) / 100;
    const tax = subtotal * 0.0825;
    const tipAmount = Math.round(subtotal * (tipPercent / 100) * 100) / 100;
  
    let deliveryFee = 4.99; // default 0
    let onlineOrderingPlatformFee = fulfillmentType === "delivery" ? +(subtotal * 0.08).toFixed(2) : 0;

    


    if (fulfillmentType === 'pickup') {
      deliveryFee = 0;
    }
    if (fulfillmentType === 'delivery' && subtotal >= 35) {
      deliveryFee = 0;
    }
    const total = subtotal + tax + onlineOrderingPlatformFee + deliveryFee + tipAmount;

    

  const createPaymentRequest = () => {
    const totalAmount = squareCart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      countryCode: "US",
      currencyCode: "USD",
      total: {
        amount: (totalAmount/100).toFixed(2),
        label: "Total",
      },
      requestBillingContact: true,
      requestShippingContact: false,
    };
  };


  useEffect(() => {

    if(fulfillmentType === 'delivery' && calculateTotalPrice() < 15){
      setAlert({
        open: true,
        title: "Add more items for delivery.",
        message: `The current cart total of $${calculateTotalPrice()} does not meet the minimum order amount of $15.00. Please add more items to your cart.`,
        onClick: () => {
          window.scrollTo(0, 0);
          navigate("/products/Typical Dishes");
        },
      });
    }


  }, [fulfillmentType]);

const saveDeliveryInfo = () => {
  const deliveryTime = new Date();
  deliveryTime.setMinutes(deliveryTime.getMinutes() + deliveryEtaDuration); 

  const formattedTime = deliveryTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });



  const formattedDate = deliveryTime.toLocaleDateString();

  const deliveryData = {
    time: formattedTime,
    date: formattedDate,
    timestamp: Date.now(), // useful for debugging later
    address: deliveryAddress,
    unit: unit,
    dropoffOption: dropoffOption,
    deliveryTime: new Date(Date.now() + deliveryEtaDuration * 60 * 1000),
    deliveryInstruction: deliveryInstruction,
    deliveryFee: deliveryFee,
    freeItemWithDelivery: freeItemWithDelivery,
  };

  localStorage.setItem("deliveryInfo", JSON.stringify(deliveryData));
  return deliveryData;
};



  
// Save pickup time
const savePickupInfo = () => {
  const pickupTime = new Date();
  pickupTime.setMinutes(pickupTime.getMinutes() + 15);

  const formattedTime = pickupTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = pickupTime.toLocaleDateString();

  const pickupData = {
    time: formattedTime,
    date: formattedDate,
    timestamp: Date.now(), // useful for debugging later
    restaurant: "Mezquite Valley street tacos and more",
    address: "430 Buck Jones Rd, Raleigh, NC 27606",
  };

  localStorage.setItem("pickupInfo", JSON.stringify(pickupData));
  return pickupData;
};

// Clear previous pickup time when a new payment starts
const clearPickupTime = () => {
  localStorage.removeItem("pickupInfo");
};

const clearDeliveryInfo = () => {
  localStorage.removeItem("deliveryInfo");
};




const isProcessingRef = useRef(false);


const handlePayment = async (token, verifiedBuyer) => {

    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    setLoading(true); // 🟢 Start spinner

    clearPickupTime();
    clearDeliveryInfo();

  const newErrors = {
    name: !customerName.trim(),
    email: !isValidEmail(customerEmail),
    phone: !isValidPhone(customerPhone),
  };

  setErrors(newErrors);

  const firstInvalidField = Object.entries(newErrors).find(
    ([_, isError]) => isError
  )?.[0];

  if (firstInvalidField) {
    const refMap = {
      name: nameRef,
      email: emailRef,
      phone: phoneRef,
    };

    refMap[firstInvalidField]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setLoading(false);
    isProcessingRef.current = false;
    return;
  }


    // Use verifiedBuyer info if available (digital wallets)
    const buyer = verifiedBuyer?.billingContact
      ? {
          name: `${verifiedBuyer.billingContact.givenName} ${verifiedBuyer.billingContact.familyName}`,
          email: verifiedBuyer.billingContact.email,
          phone: verifiedBuyer.billingContact.phone,
        }
      : {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
        };



  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nonce: token.token,
        checkoutID: crypto.randomUUID(),
        squareCart,
        customer: buyer,
        tipPercent,
        fulfillmentType,
        onlineOrderingPlatformFee,
        delivery: fulfillmentType === 'delivery' 
          ? { address: deliveryAddress,
            unit,
            dropoffOption,
            freeItemWithDelivery,
            fee: deliveryFee,
        } : null,  
      }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // ✅ Payment successful — redirect
      setLoading(false);
      isProcessingRef.current = false;
        
      const pickupInfo = savePickupInfo();
      const deliveryInfo = saveDeliveryInfo();


    // Save order to DB
      const orderPayload = {
        restaurantId: '69700244de3b3b79fc4d65f0', // Mezquite Valley street tacos and more
        customerName: buyer.name,
        customerEmail: buyer.email,
        customerPhone: buyer.phone,
        orderType: fulfillmentType,
        isRealOrder: isProduction,
        pickupTime: pickupInfo?.timestamp,
        pickupInfo,
        deliveryInfo,
        items: squareCart.map(item => ({
          productId: item.id,
          name: item.name,
          price: (Math.round(item.price * 100) / 100),
          quantity: item.quantity,
          note: item.note,
        })),
        pricing: {
          subtotal: (Math.round(subtotal * 100) / 100),
          tax: (Math.round(tax * 100) / 100),
          onlineOrderingPlatformFee: (Math.round(onlineOrderingPlatformFee * 100) / 100),
          deliveryFee: (Math.round(deliveryFee * 100) / 100),
          tipAmount: (Math.round(tipAmount * 100) / 100),
          total: (Math.round(total * 100) / 100),
        },
        payment: {
          provider: 'square',
          transactionId: data.payment?.payment?.id,
          providerOrderId: data.payment?.payment?.orderId,
          receiptUrl: data.payment?.payment?.receiptUrl,
          receiptNumber: data.payment?.payment?.receiptNumber,

          sourceType: data.payment?.payment?.sourceType,
          currency: data.payment?.payment?.currency,

          card: {
            brand: data.payment?.payment?.cardDetails?.card?.cardBrand,
            last4: data.payment?.payment?.cardDetails?.card?.last4,
            cardType: data.payment?.payment?.cardDetails?.card?.cardType,
          },

        },

      };


      



      let savedOrderResponse = null;

      try {
        savedOrderResponse = await createOrder(orderPayload); //Save order in db


        fetch('/api/order/sendemails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerName: orderPayload.customerName,
            customerEmail: orderPayload.customerEmail,
            customerPhone: orderPayload.customerPhone,
            restaurantName: 'Mezquite Valley Street Tacos and More',
            address: '430 Buck Jones Rd, Raleigh, NC 27606',
            phone: '(919) 480-6649',
            items: orderPayload.items,
            subtotal: orderPayload.pricing.subtotal,
            taxes: orderPayload.pricing.tax,
            onlineOrderingPlatformFee: orderPayload.pricing.onlineOrderingPlatformFee,
            tip: orderPayload.pricing.tipAmount,
            total: orderPayload.pricing.total,
            pickupInfo: orderPayload.pickupInfo,
            deliveryInfo: orderPayload.deliveryInfo,
            fulfillmentType: orderPayload.orderType,
            id: savedOrderResponse.data._id,
          }),
        });

      } catch (orderErr) {
        console.error("Order save or email send failed AFTER payment:", orderErr);

        // fetch("/api/order/save-failed", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     provider: "square",
        //     transactionId: orderPayload.payment.transactionId,
        //     providerOrderId: orderPayload.payment.providerOrderId,
        //     payload: orderPayload,
        //     reason: orderErr?.message,
        //   }),
        // });


      }










    //  console.log('id: ', savedOrderResponse._id);
    //  console.log('res: ', savedOrderResponse.data._id);




      // console.log("Order response in checkout:", response);
      // console.log("Saved order data:", response.data);

      window.scrollTo(0, 0);
      navigate("/orderplaced", {
        state: {
          message: data.message,
          payment: data.payment,
          buyer,
          squareCart,
          pickupInfo, 
          deliveryInfo,
          tipPercent
        },
      });

      clearCart();
    } else {
        setLoading(false);
        isProcessingRef.current = false;
        
        setAlert({
          open: true,
          title: "Payment Failed",
          message: "Something went wrong. Please try again.",
          onClick: () => setAlert({ ...alert, open: false })
        });
    }
  } catch (err) {
    console.error(err);
    isProcessingRef.current = false;
      
    setLoading(false);
      setAlert({
        open: true,
        title: "Error",
        message: "An error occurred while processing your payment. Please try again.",
        onClick: () => setAlert({ ...alert, open: false })
      });
  }
};














  const [expanded, setExpanded] = useState(false);

  const handleChange = () => setExpanded(!expanded);


  return (
     <Container maxWidth="100%"  sx={{
        mt: 0,
        mb: 0,
        backgroundColor: '',
        width: {
        xs: "100%",
        sm: "100%", 
        md: "70%", 
        lg: "50%", 
        xl: "50%"
        },
        maxWidth: '531px',
        px:0,
        py:2,
        pb: 4,
        alignContent: "center",
        }}>

        <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 1,
          borderBottom: '1px solid #e4e2e2ff',  
        }}
      >
  {/* Back */}
  <Box
    sx={{
      position: "absolute",
      px: 0,
      left: 12,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      cursor: "pointer",
      color: "primary.main",
      "&:hover": { opacity: 0.8 },
    }}
    onClick={() => navigate(-1)}
  >
    <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
    <Typography variant="body1">Back</Typography>
  </Box>

  {/* Center title */}
  <Typography variant="h4" sx={{ width: "100%", textAlign: "center" }}>
    Checkout
  </Typography>
  
</Box>

    <Typography variant="h6" sx={{mt: 2, px: 2,}}> Order Type</Typography>

    <Box sx={{ px: 2,  borderBottom: '1px solid #ddd', pb: 3, mb: 2, }}>
     <FulfillmentPanel />
    </Box>





      {/* Inner Box */}
      <Box
        sx={{ pt: 0, backgroundColor:'#ffffffff', 
         // width: {vs:'95%', sm: '95%', md: '50%', lg: '25%'}, 
         mt: 1, 
          alignSelf: "center", display: "flex", flexDirection: "column", gap: 1 }}
      >
          
          {false && fulfillmentType === 'pickup' && (
            <>
            <Typography
            //  variant="h4"
              fontSize={`15px`}
              fontWeight="semibold"
              color="black"

              sx={{
                alignSelf: 'flex-start'
            }}
            >
            Pickup Location:
            </Typography>

            <Box borderRadius={2} overflow="hidden">
              <iframe
                title="Map"
                width="100%"
                height="150"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9051898971597!2d-78.73512258786724!3d35.77770522455261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5ba14a1bc5f%3A0x47d96ed044bb0634!2sMezquite%20Valley%20street%20tacos%20and%20more!5e0!3m2!1sen!2sus!4v1762814670884!5m2!1sen!2sus"
              ></iframe>
            </Box>







            </>
          )}
          

            {/* <Button
        fullWidth
        variant="contained"
        color="success"
        sx={{ 
          mt: 1, 
          py: 1.5,
          boxShadow: 0,
          fontSize: '1.0rem',
          borderRadius: 10, 
          backgroundColor:"#000000ff",
          textTransform: "none" }}
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/products/Typical Dishes");
        }}
      >
        Go Back to Menu
      </Button> */}

        
    
        
        <Typography variant="h6" sx={{mt: 0, px: 2}}>Your Info</Typography>
        <Box sx={{ mx: 2, mb: 2, p:2, backgroundColor: '#f5f5f5', borderRadius: 2, borderBottom:'2px solid #ccc' }}>
        <TextField
          inputRef={nameRef}
          label="Full Name"
          value={customerName}
          error={errors.name}
          helperText={errors.name ? "Please enter your name" : ""}
          sx={{backgroundColor: "#fff",}}
          onChange={(e) => {
            const value = e.target.value;

            if (value.length <= 20) {
              setCustomerName(value);
            }

            if (errors.name && value.trim() !== "") {
              setErrors((prev) => ({ ...prev, name: false }));
            }

          }}
          slotProps={{
              input: {
                maxLength: 5,
              },
            }}
          fullWidth
          required
        />
      <TextField
        inputRef={emailRef}
          label="Email"
        type="email"
        value={customerEmail}
        error={errors.email}
        helperText={errors.email ? "Please enter a valid email address" : ""}
        sx={{ backgroundColor: "#fff", mt: 2 }}
        fullWidth
        required
        onChange={(e) => {
          const value = e.target.value;
          setCustomerEmail(value);

          // Clear error only if email becomes valid
          if (errors.email && isValidEmail(value)) {
            setErrors((prev) => ({ ...prev, email: false }));
          }
        }}
        onBlur={() => {
          if (!isValidEmail(customerEmail)) {
            setErrors((prev) => ({ ...prev, email: true }));
          }
        }}
      />

        <TextField
          inputRef={phoneRef}
          label="Phone"
          type="tel"
          value={customerPhone}
          error={errors.phone}
          helperText={errors.phone ? "Enter a valid 10-digit phone number" : ""}
          sx={{ mt: 2, backgroundColor: "#fff" }}
          fullWidth
          required
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, "");

            if (value.length > 10) value = value.slice(0, 10);

            let formatted = value;
            if (value.length > 6) {
              formatted = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
            } else if (value.length > 3) {
              formatted = `${value.slice(0, 3)}-${value.slice(3)}`;
            }

            setCustomerPhone(formatted);

            // Clear error only if valid
            if (errors.phone && isValidPhone(formatted)) {
              setErrors((prev) => ({ ...prev, phone: false }));
            }
          }}
          onBlur={() => {
            if (!isValidPhone(customerPhone)) {
              setErrors((prev) => ({ ...prev, phone: true }));
            }
          }}
          slotProps={{
            input: {
              maxLength: 12, // 123-456-7890
              inputMode: "tel",
            },
          }}
        />

        </Box>




<Accordion
      expanded={expanded}
      onChange={handleChange}
      sx={{ width: "100%", borderRadius: '0',
        boxShadow: "none", // removes shadow
    '&:before': {
      display: 'none', // removes the default divider line above
    },
    py: 1,
    borderBottom: '1px solid #e4e2e2ff',
    borderTop: '1px solid #e4e2e2ff'
      }}
    >
<AccordionSummary
  expandIcon={<ExpandMoreIcon />}
  aria-controls="cart-content"
  id="cart-header"
  sx={{ width: "100%", pl:0, borderTop: '0' }}
>
  <Box display="flex" flexDirection="column" alignItems="flex-start">
  <Typography  fontSize={`18px`} fontWeight="semibold" color="black" sx={{mx: 2,}}>
    Order Summary ({squareCart.length} {squareCart.length === 1 ? 'Item' : 'Items'})
  </Typography>

</Box>

</AccordionSummary>

      <AccordionDetails sx={{mx: 2, mb: 1, p:0,backgroundColor: '#f5f5f5', borderRadius: 2 }}>

      <List>
        {squareCart.map((item, i) => (
          <ListItem key={i} divider>
            <ListItemText
              primary={`${item.quantity} - ${item.name}`}
             secondary={
                <>
                {false && item.note && (
                  <>
                    {item.note}
                    <br />
                  </>
                )}
                ${((item.price * item.quantity) / 100).toFixed(2)}
              </>
            }/>
          </ListItem>
        ))}
        {/* Calculate the total */}
        <ListItem>
          <ListItemText
            primary="Subtotal"
            secondary={`$${subtotal.toFixed(2)}`}
          />
        </ListItem>
          <ListItem
    button
    onClick={() => navigate(`/products/Typical Dishes`)}
    sx={{
      textAlign: "center",
      justifyContent: "center",
      color: "green",
      fontWeight: "bold",
      '&:hover': { backgroundColor: '#f5f5f5' },
    }}
  >
    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
      + Add more items
    </Typography>
  </ListItem>
      </List>
    </AccordionDetails>

    </Accordion>










        <Typography variant="h6" sx={{mx: 2, mt: 2}}>Payment</Typography>


    {/* Order Summary */}
    <Box sx={{ mx: 2, pb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, borderBottom:'2px solid #ccc'   }}>
      {(() => {
    


        const Row = ({ label, value, bold = false }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: bold ? "bold" : "normal" }}
            >
              {label}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: bold ? "bold" : "normal" }}
            >
              {value}
            </Typography>
          </Box>
        );

        return (
          <>
            <Row label="Subtotal:" value={`$${subtotal.toFixed(2)}`} />
            {fulfillmentType === 'delivery' 
            ? <Row label="Taxes & Fees:" value={`$${(tax + onlineOrderingPlatformFee).toFixed(2)}`} />
            : <Row label="Taxes:" value={`$${tax.toFixed(2)}`} />
            
          }

            {fulfillmentType === 'delivery' && <Row label="Delivery Charge:" value={`$${deliveryFee.toFixed(2)}`} />}

            {/* TIP ROW */}
            <Row label="Tip:" value={`$${tipAmount.toFixed(2)}`} />

            {/* TIP BUTTONS */}
            <Box sx={{ display: "flex", justifyContent: 'space-between', my: 1 }}>
              {[20, 15, 10, 5, 0].map((p) => (
                <Box
                  key={p}
                  onClick={() => setTipPercent(p)}
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: "10px",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    backgroundColor: tipPercent === p ? "primary.main" : "white",
                    color: tipPercent === p ? "primary.contrastText" : "#303030ff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {p}%
                </Box>
              ))}
            </Box>




          <Box
            sx={{
              borderTop: "1px solid #ccc",
              my: 2,       // spacing around separator
            }}
          />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.9,
              }}
            >
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: "bold",
                  fontSize: "1.15rem",   // bigger total label
                }}
              >
                Order Total:
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: "bold",
                  fontSize: "1.15rem",   // bigger total value
                }}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>
            
          </>
        );
      })()}
    </Box>


        <Typography variant="h6" sx={{mt:3, pt: 2, px: 2, borderTop: '1px solid #ddd'}}>Card Details</Typography>

        <Box sx={{ mx: 2, p:2, backgroundColor: '#f5f5f5', borderRadius: 2, borderBottom:'2px solid #ccc', mb: 2  }}>

        <PaymentForm
          applicationId={appId}
          locationId={locationId}
          cardTokenizeResponseReceived={handlePayment}
          createPaymentRequest={createPaymentRequest}
        >

          <CreditCard buttonProps={{
              css: {
                backgroundColor: "#108910",
                color: "#ffffff",
                fontFamily: 'Roboto Slab',
                
                "&:hover": {
                  backgroundColor: "#0a610a",
                },
              },
            }}/>

          {/* <CreditCard /> */}
          <GooglePay style={{marginTop: '1rem'}}/>
          <ApplePay style={{marginTop: '1rem'}}/>
          {/* <CashAppPay /> */}
        </PaymentForm>
        </Box>

<TermsAgreement/>
    <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


   
      <CustomAlert
        open={alert.open}
        title={alert.title}
        message={alert.message}
        onClose={alert.onClick}
      />

      </Box>

      
    </Container>
  );
}
