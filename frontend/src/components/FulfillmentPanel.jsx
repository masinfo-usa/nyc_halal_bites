import {
  Box,
  Typography,
  Drawer,
  TextField,
  Button,
  CircularProgress,
  InputBase,
} from "@mui/material";


import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import {
  MdStore,
  MdDeliveryDining,
  MdAccessTime,
} from "react-icons/md";
import { useProductStore } from '../store/product';
import { Directions, Close as CloseIcon } from "@mui/icons-material";

import { InputAdornment } from "@mui/material";
import {
  MdLocationOn,
  MdApartment,
  MdNotes,
} from "react-icons/md";
import { Divider } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EditOutlinedIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { IconButton } from "@mui/material";
import axios from "axios";
import OfferAlert from "../components/OfferAlert";


  export const deliveryEtaMins = ({
    orderTotal,
    deliveryDistance,
    pendingOrdersCount,
  }) => {
    const clamp = (value, min, max) =>
      Math.min(Math.max(value, min), max);

    const BASE_TIME = 10;                 // mins
    const ORDER_VALUE_FACTOR = 0.3;      // mins per $
    const PENDING_ORDER_FACTOR = 4;       // mins per order
    const MAX_PENDING_TIME = 30;          // cap
    const DISTANCE_FACTOR = 2.5;          // mins per mile

    const orderValueTime =
      Math.floor(orderTotal) * ORDER_VALUE_FACTOR;



    const kitchenLoadTime =
      Math.min(pendingOrdersCount * PENDING_ORDER_FACTOR, MAX_PENDING_TIME);

    const distanceTime =
      deliveryDistance * DISTANCE_FACTOR;

    const rawEta =
      BASE_TIME +
      orderValueTime +
      kitchenLoadTime +
      distanceTime;



    return clamp(Math.ceil(rawEta), 25, 100);
  };


export default function FulfillmentPanel({ fixed = false }) {
  const {
    fulfillmentType,
    pickupAddress,
    deliveryAddress,
    unit,
    setFulfillmentType,
    setDeliveryAddress,
    setUnit,
    dropoffOption, 
    setDropoffOption,
    freeItemWithDelivery,
    setFreeItemWithDelivery,
    deliveryInstruction,
    setDeliveryInstruction,
    targetAddress, setTargetAddress,
    isFulfillmentOpen,
    setFulfillmentOpen,
    isDeliveryOpen,
    deliveryDistance,
    setDeliveryDistance,
    calculateTotalPrice,
    deliveryEtaDuration,
    setDeliveryETADuration
  } = useProductStore();

  


  const [pendingOrders, setPendingOrders] = useState([]);
  const [showUnitField, setShowUnitField] = useState(false);
    const unitRef = useRef(null);
  

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "/api/orders?orderType=delivery&today=true"
        );
  
        const ordersWithCustomer = res.data.map(order => ({
          ...order,
          customerName: order.customerId?.name || "Unknown",
          customerPhone: order.customerId?.phone || "",
        }));
  
        const pOrders = ordersWithCustomer.filter(o => o.status !== "delivered");

        setPendingOrders(pOrders);



      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };
  
    useEffect(() => {
      fetchOrders();

      const OFFER_KEY = "lastOfferShownAt";
      const ONE_HOUR = 120 * 60 * 1000; // ms



      const lastShown = localStorage.getItem(OFFER_KEY);
      const now = Date.now();

    //  console.log("Last offer shown at:", lastShown ? new Date(Number(lastShown)).toLocaleString() : "Never");
      if (!lastShown || now - Number(lastShown) > ONE_HOUR) {
        setShowOffer(true);
        localStorage.setItem(OFFER_KEY, Date.now().toString());
      }


    }, []);
  
  
  useEffect(() => {
    if (!pendingOrders) return;

    const eta = deliveryEtaMins({
        orderTotal: calculateTotalPrice(),
        deliveryDistance,
        pendingOrdersCount: pendingOrders.length,
      });


    setDeliveryETADuration(
      eta
    );

  }, [pendingOrders, deliveryDistance, calculateTotalPrice()]);





  const [targetFulfillment, setTargetFulfillment] = useState('pickup');
  // const [targetAddress, setTargetAddress] = useState(deliveryAddress || null );
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showOffer, setShowOffer] = useState(false);





  const [addressError, setAddressError] = useState(0);


    const handleConfirmDelivery = () => {
    if (targetAddress === null || isDeliveryOpen === false) {
      //  setAddressError(1);
        return;
    }


    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setDeliveryAddress(targetAddress);
      setFulfillmentType("delivery");
      setFulfillmentOpen(false);
    }, Math.floor(Math.random() * 1500) + 800);



    };




    const autocompleteRef = useRef(null);


    const PICKUP_LOCATION = {
      lat: 35.777722327665465,
      lng: -78.73253536776087,
    };


    const MAX_DISTANCE_MILES = 4;


    const getDistanceInMiles = (lat1, lng1, lat2, lng2) => {
      const toRad = (value) => (value * Math.PI) / 180;

      const R = 3958.8; // Earth radius in miles
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLng / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };



    
    const parseUSAddress = (formattedAddress = "", loc = null) => {
      const result = {
        full: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        location: {
          lat: null,
          lng: null,
        },
      };

      if (!formattedAddress) return result;

      // Save full address
      result.full = formattedAddress;

      // Save location safely
      if (loc) {
        result.location.lat = typeof loc.lat === "function" ? loc.lat() : loc.lat;
        result.location.lng = typeof loc.lng === "function" ? loc.lng() : loc.lng;
      }

      // Example:
      // "430 Buck Jones Rd, Raleigh, NC 27606"
      const parts = formattedAddress.split(",").map(p => p.trim());

      if (parts.length >= 3) {
        result.street = parts[0];
        result.city = parts[1];

        const stateZip = parts[2].split(" ").filter(Boolean);
        result.state = stateZip[0] || "";
        result.zip = stateZip[1] || "";
      }

      return result;
    };

    const RESTAURANT_LOCATION = {
      lat: 35.7796,
      lng: -78.6382, // example: Raleigh
    };



    useEffect(() => {
      if (!autocompleteRef.current) return;
    
      const el = autocompleteRef.current;
   //   el.includedPrimaryTypes = ["street_address"];

      el.locationBias = {
        center: {
          lat: RESTAURANT_LOCATION.lat,
          lng: RESTAURANT_LOCATION.lng,
        },
        radius: 50000, // meters
      };














      const handlePlaceSelect = async (event) => {
        const placePrediction = event.placePrediction;
        if (!placePrediction) return;

        const place = await placePrediction.toPlace();
        await place.fetchFields({
          fields: ["formattedAddress", "location", "addressComponents",],
        });

        const deliveryLat = place.location.lat();
        const deliveryLng = place.location.lng();

        const distance = getDistanceInMiles(
          PICKUP_LOCATION.lat,
          PICKUP_LOCATION.lng,
          deliveryLat,
          deliveryLng
        );

        setDeliveryDistance(distance);

        console.log("Distance (miles):", distance.toFixed(2));






    const hasStreetNumber = place.addressComponents?.some(
      (c) => c.types.includes("street_number")
    );

    if (!hasStreetNumber) {

      console.log("no hasStreetNumber");

       setAddressError(2);
      // setTargetAddress("");
      // setIsDeliveryValid(false);
      return;
    }





        if (distance <= MAX_DISTANCE_MILES) {
//        setTargetAddress(place.formattedAddress);

          setTargetAddress(parseUSAddress(place.formattedAddress, place.location));

          setAddressError(0);
          setUnit('');
          setShowUnitField(false);
          setDropoffOption('Leave at door');
          setDeliveryInstruction('');
        } else {
          setAddressError(1);
        }
      };



      const handleTyping = () => {

      };

  
      el.addEventListener("gmp-select", handlePlaceSelect);
      el.addEventListener("input", handleTyping);

      return () => {
        el.removeEventListener("gmp-select", handlePlaceSelect);
        el.removeEventListener("input", handleTyping);
      };



    }, [targetAddress || targetFulfillment]); 
    





  return (
    <>



      <OfferAlert
        open={showOffer}
        title="Delivery Offer !"
        message="We currently deliver within a 5-mile radius."
        onPickupClick={() => {
          setTargetFulfillment("pickup");
          setFulfillmentOpen(true);
          setShowOffer(false);
        }}
        onDeliveryClick={() => {
          setTargetFulfillment("delivery");
          setFulfillmentOpen(true);
          setShowOffer(false);
        }}
      />


      {/* MAIN PANEL */}
      <Box
        sx={{
        height: 'auto',
        width: "100%",
        px: fixed ? 0 : 1.5,
        py: 1.5,
        mt: fixed  ? 0 : 2,
        backgroundColor: fixed ? "#fff" : "#f5f5f5",
        borderRadius: fixed  ? 0 : 2,
        display: "flex",
        color: "#000",
        flexDirection: "column",
        justifyContent: "center",
        boxShadow: fixed ? 0 : "none",
        position: fixed ? "sticky" : "relative",
        top: fixed ? 64 : "auto",
        zIndex: fixed ? 1100 : "auto",
        borderBottom: fixed ? "1px solid #48c54eff" : '2px solid #ccc',
        fontSize: "0.90rem",
        fontFamily: "Roboto Slab",
        "& *": {
        fontFamily: "inherit",
        fontSize: "inherit",
        
        },
  
        }}

      >
        {/* Tabs */}
        <Box
            sx={{
                width: "100%",
                height: 55,
                mx: "auto",
                mt: 0,
                mb: 1,
                display: "flex",
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 2,
                overflow: "hidden",
            }}
            >
        <TabButton
            active={fulfillmentType === "pickup"}
            icon={<MdStore size={21}/>}
            label="Pickup"
            onClick={() => {
            setTargetFulfillment("pickup");
            setFulfillmentOpen(true);
            }}
            sx={{
            flex: 1,
            borderRadius: 2,
            borderRight: "1px solid",
            borderColor: "grey.400",
            }}
        />

        <TabButton
            active={fulfillmentType === "delivery"}
            icon={<MdDeliveryDining size={21}/>}
            label="Delivery"
            onClick={() => {
            setTargetFulfillment("delivery");
            setFulfillmentOpen(true);
            }}
            sx={{
            flex: 1,
            borderRadius: 2,
            ml: -1,
            }}
        />
        </Box>





        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5,  }}>
            <MdAccessTime size={25} color="" />
            <Typography
              variant="body2"
              sx={{ color: "#000", fontFamily: 'Roboto Slab' }}
            >
              {fulfillmentType === "pickup"
                ? "Pickup: ASAP"
                : `Delivery: ${deliveryEtaDuration} mins (Approx.)`}
            </Typography>
          </Box>

        {/* Info Row */}
        <Box
          sx={{
            mt: 0.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              minWidth: 0,
            }}
          >
            {fulfillmentType === "pickup" ? (
              <MdStore size={25} />
            ) : (
              <MdDeliveryDining size={25} />
            )}

            <Typography
              variant="body2"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontFamily: 'Roboto Slab',
              }}

              onClick={() => {
                if (fulfillmentType === "delivery"){
                  setTargetFulfillment("delivery");
                  setFulfillmentOpen(true);
                }
              }}
            >
              {fulfillmentType === "pickup"
                ? `Pickup at: ${pickupAddress}`
                : deliveryAddress?.full
                ? `Delivery to: ${deliveryAddress?.full}`
                : "Enter delivery address"}
            </Typography>


            
          </Box>


        </Box>



        {fulfillmentType === "delivery" && (location.pathname.startsWith("/checkout")) &&
        
        (<>
        <Divider sx={{ my: 2 }} />



        <Box sx={{
              p: 2,
              mb: 1,
              borderRadius: 1,
              border: "1px solid #ddd",
              backgroundColor: "",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: 'column',
              gap: 1.5,
            }}>

            <Typography sx={{ mb: 1, fontWeight: 600, color: '#444' }}>
              Choose your free item with delivery order:
            </Typography>

            <FormControl fullWidth size="small">
              <InputLabel id="free-item-label" >Free Item</InputLabel>
              <Select
                labelId="free-item-label"
                value={freeItemWithDelivery}
                label="Free Item"
                onChange={(e) => setFreeItemWithDelivery(e.target.value)}
                MenuProps={{
                  disablePortal: true,
                }}
                sx={{ backgroundColor: '#fff', color: '#444', fontFamily: 'Roboto Slab'}}
              >

                <MenuItem value="Bag of Chips">
                  Bag of Chips
                </MenuItem>

                <MenuItem value="Taco - Carnitas">
                  Taco - Carnitas
                </MenuItem>
                <MenuItem value="Bean dip">
                  Bean dip
                </MenuItem>
                <MenuItem value="Cinnamon Chips">
                  Cinnamon Chips
                </MenuItem>
              </Select>
            </FormControl>
              </Box>

      <Divider sx={{ my: 2 }} />


        <TextField
          fullWidth
          label="Delivery Instruction (optional):"
          placeholder="Write a note for delivery driver."
          value={deliveryInstruction}
          onChange={(e) => setDeliveryInstruction(e.target.value)}
          sx={{ mt: 1, mb: 1, backgroundColor: "#fff" }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  {isFocused ? (
                    /* ✅ TICK — when focused */
                    <IconButton
                      edge="end"
                      onMouseDown={(e) => e.preventDefault()} // prevent blur
                      onClick={() => {
                        document.activeElement?.blur(); // unfocus input
                      }}
                    >
                      <CheckIcon
                        sx={{
                          bgcolor: "primary.main",
                          border: '1px solid #00b300',
                          color: "#fff",
                          p: 0.75,
                          width: 35,
                          height: 35,
                          borderRadius: 2,
                        }}
                      />
                    </IconButton>
                  ) : deliveryInstruction ? (
                    /* ❌ CLOSE — when NOT focused */
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setDeliveryInstruction(""); // clear text
                      }}
                    >
                      <CloseIcon
                        sx={{
                          bgcolor: "#fff",
                          color: "#000",
                          border: "2px solid #000",
                          borderRadius: 16,
                          p: "1px",
                          mr: "5px",
                          width: 20,
                          height: 20,
                        }}
                      />
                    </IconButton>
                  ) : null}
                </InputAdornment>
              ),
            },
          }}
        />





        </>)
        
        }


      </Box>

      {/* DRAWER */}
    <Drawer

anchor="right"
  open={isFulfillmentOpen}
  onClose={() => setFulfillmentOpen(false)}
  
  ModalProps={{
    keepMounted: true,
    disableEnforceFocus: true,   // <-- Allow inputs inside to retain focus
    disableAutoFocus: true,      // <-- Prevent auto focus
  }}

SlideProps={{
    timeout: {
      enter: 500,
      exit: 500,
    },
    
  }}


    // slotProps={{
    //     backdrop: {
    //     sx: {
    //         backdropFilter: "blur(10px)",
    //         backgroundColor: "rgba(0,0,0,0.0)",
    //     },
    //     },
    // }}



    sx={{

        zIndex: 1400, // Ensure this is lower than your CSS z-index (9999)

        '& .MuiDrawer-paper': {
          width: {
            xs: "100%",
            sm: "100%",
            md: "50%",
            lg: "30%",
            xl: "25%"
          },
        },

        "& .MuiDrawer-paperAnchorBottom": {
        backgroundColor: "transparent",
        // borderRadius: "50px 50px 0 0",
        },
    }}
    >
        <Box sx={{ height: "100vh", bgcolor: "#fff", borderRadius: '0px 0px 0 0', overflowY: 'auto' }}>
          {/* Header */}
          <Box
            name="header"
            sx={{
              position: 'sticky',
              zIndex: 10,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: '70px',
              textAlign: 'left',
              width: '100%',
              backgroundColor: '#000',
              borderBottom: '2px solid #d0d0d0',
              mb: 0,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                backgroundColor: '',
                color: '#fff',
                fontWeight: 'bold',
                fontFamily: 'Roboto Slab',
                display: 'flex',
              }}
            >
              Choose your order type 
            </Typography>
          
            {/* Close Button on Right */}
            {/* <Button
              size="small"
              sx={{
                backgroundColor: '#636363',
                width: 40,
                height: 40,
                minWidth: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  backgroundColor: '#a0a0a0',
                },
              }}
              onClick={() => setFulfillmentOpen(false)}
            >
              <CloseIcon sx={{ color: '#fff' }} />
            </Button> */}
          </Box>
          


        <Box sx={{ px: 2, py: 2, bgcolor: '#fff', display: "flex", flexDirection: "column", gap: 2  }}>

        <Box
            sx={{
                width: "100%",
                height: 55,
                mx: "auto",
                mt: 0,
                mb: 2,
                display: "flex",
                border: "1px solid",
                borderColor: "grey.400",
                borderRadius: 2,
                overflow: "hidden",
            }}
            >
        <TabButton
            active={targetFulfillment === "pickup"}
            icon={<MdStore size={21}/>}
            label="Pickup"
            onClick={() => {
            setTargetFulfillment("pickup");
            }}
            sx={{
            flex: 1,
            borderRadius: 2,
            borderRight: "1px solid",
            borderColor: "grey.400",
            }}
        />

        <TabButton
            active={targetFulfillment === "delivery"}
            icon={<MdDeliveryDining  size={21} />}
            label="Delivery"
            onClick={() => {
            setTargetFulfillment("delivery");
            }}
            sx={{
            flex: 1,
            borderRadius: 2,
            ml: -1,
            }}
        />
        </Box>


          {/* Content */}
          {targetFulfillment === "pickup" ? (
            <>
        <Box sx={{ mb: 5}}>
        <iframe
          title="Map"
          width="100%"
          height="150"
          style={{ border: 0, borderRadius: 8 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9051898971597!2d-78.73512258786724!3d35.77770522455261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5ba14a1bc5f%3A0x47d96ed044bb0634!2sMezquite%20Valley%20street%20tacos%20and%20more!5e0!3m2!1sen!2sus!4v1762814670884!5m2!1sen!2sus"
        ></iframe>
        <Box sx={{ display: "flex", fontFamily: 'Roboto Slab', justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Box>
            <Typography fontWeight="bold">
              Mezquite Valley Street Tacos and More
            </Typography>
            <Typography fontSize={`14px`}
          fontWeight="semibold"
          color="#777777ff">
              430 Buck Jones Rd, Raleigh, NC 27606
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/dir/?api=1&destination=430+Buck+Jones+Rd,+Raleigh,+NC+27606"
              )
            }
          >
            <Directions  />
          </Button>
        </Box>
      </Box>

              <Button
                      disabled = {false}
                      sx={{
                        backgroundColor: (true) ? 'primary.main' : "grey",
                        borderRadius: 2,
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        fontFamily: 'Roboto Slab',
                        width: '100%',
                        height: '50px',
                        textTransform: 'none', // Prevent capitalization
                        position: 'relative', // Relative positioning for internal elements
                        display: 'flex',
                        justifyContent: 'center', // Center the text
                        alignItems: 'center', // Align text vertically
                      }}
                     onClick={() => {
                        setFulfillmentType("pickup");
                        setFulfillmentOpen(false);
                        }}
                    >
                    
                      I will pick up my order

                    </Button>
            </>
          ) : (
            <>

    {targetAddress === null ? (
      
<gmp-place-autocomplete key={targetFulfillment} ref={autocompleteRef} placeholder="Start typing your address" style={{ width: "100%", height: "55px", // Match your MUI height 
borderRadius: "8px", fontSize: "16px", }} ></gmp-place-autocomplete>
) 
      : (
        <>
  {/* Address Card */}
  <Box
  sx={{
    borderRadius: 2,
      border: "1px solid #ddd",
      backgroundColor: "#fff",
      cursor: "pointer",
      
  }}
  >
  <Box
    onClick={() => {
      setDeliveryAddress(null);
      setTargetAddress(null);
      setAddressError(0);
    }}
    sx={{
      pt: 2,
      px: 2,
      backgroundColor: "",
      mb: 0,
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
    }}
  >
    <LocationOnOutlinedIcon sx={{ color: "primary.main", mt: "3px" }} />

    <Box sx={{ flexGrow: 1,  }}>
      <Typography sx={{ fontWeight: 600, fontFamily: 'Roboto Slab', fontSize: "1.10rem", color: "#444" }}>
        Delivery address
      </Typography>

      <Typography sx={{ fontSize: "1rem", fontFamily: 'Roboto Slab', color: "#999", lineHeight: 1.4 }}>
        {targetAddress?.full || "Select delivery address"}
      </Typography>
    </Box>

    <EditOutlinedIcon sx={{ color: "#777", fontSize: "1.1rem" }} />

    
  </Box>


    {targetAddress &&  (
  (showUnitField) ? (
    <InputBase
      inputRef = {unitRef}
      placeholder="Apt / Suite / Room"
      value={unit}
      onChange={(e) => setUnit(e.target.value)}
      onBlur={() => {
        if (!unit) {
          setShowUnitField(false);
          }
      }}
      sx={{
        ml: 6.5,
        mt: 0.5,
        mb: 2,
        fontSize: "1.2rem",
        fontFamily: "Roboto Slab",
        backgroundColor: "#fff",
        borderRadius: 2,
        border: 0,
        width: "calc(90% - 32px)",
      }}
    />
  ) : (
    <Typography
      onClick={(e) => {
        e.stopPropagation();
        setShowUnitField(true);
        setTimeout(() => {
          unitRef.current?.focus();
        }, 0);
        
      }}
      sx={{
        ml: 6.5,
        mt: 1,
        mb: 2,
        fontSize: "1.2rem",
        color: "primary.main",
        cursor: "pointer",
        width: "fit-content",
        fontFamily: 'Roboto Slab' 
      }}
    >
      + Add apt, suite or room 
    </Typography>
  )
)}



</Box>

  


  {/* Drop-off options */}
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 1.5,
      mb: 0.5,
    }}
  >
    {[
      "Leave at door",
      "Meet at door",
      "Leave in the lobby",
      "Meet outside",
    ].map((option) => (
      <Box
        key={option}
        onClick={() => setDropoffOption(option)}
        sx={{
          p: 1.2,
          borderRadius: 2,
          textAlign: "center",
          border: "1px solid",
          borderColor:
            dropoffOption === option ? "#777" : "#ddd",
          backgroundColor:
            dropoffOption === option ? "#ebebeb" : "#fff",
          color:
            dropoffOption === option ? "#444" : "#444",
          fontWeight: 600,
          fontSize: "0.9rem",
          fontFamily: "Roboto Slab",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {option}
      </Box>
    ))}
  </Box>



  <Box sx={{
      p: 2,
      mb: 2,
      borderRadius: 2,
      border: "1px solid #ddd",
      backgroundColor: "#eee",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: 'column',
      gap: 1.5,
    }}>

    <Typography sx={{ mb: 1, fontWeight: 600, color: '#444' }}>
      Choose your free item with any delivery order:
    </Typography>

<FormControl fullWidth size="small">
  <InputLabel id="free-item-label" >Free Item</InputLabel>
  <Select
    labelId="free-item-label"
    value={freeItemWithDelivery}
    label="Free Item"
    onChange={(e) => setFreeItemWithDelivery(e.target.value)}
    MenuProps={{
      disablePortal: true,
    }}
    sx={{ backgroundColor: '#fff', color: '#444', fontFamily: 'Roboto Slab'}}
  >

    <MenuItem value="Bag of Chips">
      Bag of Chips
    </MenuItem>

    <MenuItem value="Taco - Carnitas">
      Taco - Carnitas
    </MenuItem>
    <MenuItem value="Bean dip">
      Bean dip
    </MenuItem>
    <MenuItem value="Cinnamon Chips">
      Cinnamon Chips
    </MenuItem>
  </Select>
</FormControl>
  </Box>


</>

      
    )

    }
  








{(addressError || !isDeliveryOpen) && (
  <>



  <Typography fontFamily={'Roboto Slab'} color="#f08a46" variant="body2" textAlign={'center'}>

    {
      addressError === 1 ?
        "We currently deliver to addresses within 5 miles of the pickup location."  
      : addressError === 2 ?
        "Please enter a complete street address, including the house number."  
      : "Delivery is available from 5:30 PM to 10:30 PM. Please place your order during this time."
    }

  </Typography>


  <Button
  // disabled={!addressInput}
    sx={{
      backgroundColor: "#f08a46",
      borderRadius: 2,
      mt: 1,
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.1rem",
      width: "100%",
      height: "50px",
      textTransform: "none",
    }}
    onClick={() => {
      setTargetFulfillment('pickup');
      setTargetAddress(null);
      setAddressError(0);
    }}
  >
    Switch to pickup  
  </Button>

  </>
)}


<Button
 // disabled={!addressInput}
  sx={{
    backgroundColor: (targetAddress && isDeliveryOpen) ? "primary.main" : "grey.300",
    borderRadius: 2,
    mt: 3,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    width: "100%",
    height: "50px",
    textTransform: "none",
  }}
  onClick={handleConfirmDelivery}
>


    {isLoading ? (
      <CircularProgress size={24} color="inherit" />
      ) : (<>    
        Deliver to this address     
    </>)}


</Button>




            </>
          )}
        </Box>

        </Box>

      </Drawer>
    </>
  );
}

/* ---------- Reusable Tab ---------- */

function TabButton({ active, icon, label, onClick, sx }) {
  return (
    <Button
      onClick={onClick}
      disableRipple
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.5,
        fontSize: "1.05rem",
        fontFamily: "Roboto Slab",
        bgcolor: active ? "primary.main" : "transparent",
        color: active ? "primary.contrastText" : "text.primary",
        textTransform: "none",
        ...sx, // allow custom styles from parent
      }}
    >
      {icon} {label}
    </Button>
  );
}
