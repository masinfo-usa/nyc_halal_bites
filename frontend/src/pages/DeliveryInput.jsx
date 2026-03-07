import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, InputAdornment, Button, Typography } from "@mui/material";
import { MdLocationOn, MdStore, MdDeliveryDining  } from "react-icons/md";
import { Directions, Close as CloseIcon } from "@mui/icons-material";
import { useProductStore } from "../store/product";

import {
  MdApartment,
  MdNotes,
} from "react-icons/md";



export default function DeliveryInput() {
  const autocompleteRef = useRef(null);
  const [addressInput, setAddressInput] = useState("");

    const [targetFulfillment, setTargetFulfillment] = useState('delivery');

  const [isDeliveryValid, setIsDeliveryValid] = useState(false);
  const [addressError, setAddressError] = useState(false);

    // local typing buffer (important!)



      const {
        fulfillmentType,
        pickupAddress,
        deliveryAddress,
        unit,
        setFulfillmentType,
        setDeliveryAddress,
        setUnit,
      } = useProductStore();



useEffect(() => {
  if (!autocompleteRef.current) return;

  const el = autocompleteRef.current;

  const handlePlaceSelect = async (event) => {
    const placePrediction = event.placePrediction;
    if (!placePrediction) return;

    const place = await placePrediction.toPlace();
    await place.fetchFields({
      fields: ["formattedAddress", "location"],
    });

    console.log("Selected place:", place);
    setDeliveryAddress(place.formattedAddress);
    setIsDeliveryValid(true);
  };

  el.addEventListener("gmp-select", handlePlaceSelect);

  return () => {
    el.removeEventListener("gmp-select", handlePlaceSelect);
  };
}, [targetFulfillment]); // 🔥 important



  const handleInputChange = (e) => {
    setAddressInput(e.target.value);
    setIsDeliveryValid(false); // typing disables delivery button until selection
  };


    const handleConfirmDelivery = () => {
    if (!isDeliveryValid) {
        setAddressError(true);
        return;
    }

    setFulfillmentType("delivery");
    setOpen(false);
    };



  return (
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
            <Button
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
              onClick={() => setOpen(false)}
            >
              <CloseIcon sx={{ color: '#fff' }} />
            </Button>
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
        <Box sx={{ mb: 1}}>
        <iframe
          title="Map"
          width="100%"
          height="150"
          style={{ border: 0, borderRadius: 8 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9051898971597!2d-78.73512258786724!3d35.77770522455261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acf5ba14a1bc5f%3A0x47d96ed044bb0634!2sMezquite%20Valley%20street%20tacos%20and%20more!5e0!3m2!1sen!2sus!4v1762814670884!5m2!1sen!2sus"
        ></iframe>


        
        <Box sx={{ display: "flex", fontFamily: 'Roboto Slab', justifyContent: "space-between", alignItems: "center", mt: 1 }}>



          
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
                        setOpen(false);
                        }}
                    >
                    
                      I will pick up my order

                    </Button>



                    
            </>
          ) : (
            <>

<gmp-place-autocomplete
    key={targetFulfillment} 
    ref={autocompleteRef}
    placeholder="Start typing your address"
    style={{
      width: "100%",
      height: "55px", // Match your MUI height
      borderRadius: "8px",
      fontSize: "16px",
    }}
  ></gmp-place-autocomplete>


<TextField
  fullWidth
  label="Apt / Suite / Room (optional)"
  value={unit}
  onChange={(e) => setUnit(e.target.value)}
  sx={{ mb: 2 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <MdApartment />
      </InputAdornment>
    ),
  }}
/>

<TextField
  fullWidth
  label="Delivery Instructions (optional)"
  sx={{ mb: 2 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <MdNotes />
      </InputAdornment>
    ),
  }}
/>




<Button
  disabled={!addressInput}
  sx={{
    backgroundColor: isDeliveryValid ? "primary.main" : "grey.300",
    borderRadius: 2,
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    width: "100%",
    height: "50px",
    textTransform: "none",
  }}
  onClick={handleConfirmDelivery}
>
  Deliver to this address
</Button>



              <Button
                fullWidth
                variant="outlined"
                disabled={!isDeliveryValid}
                onClick={() => setDeliveryAddress('')}
              >
                Clear address
              </Button>

            </>
          )}
        </Box>

        </Box>
  );
}


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