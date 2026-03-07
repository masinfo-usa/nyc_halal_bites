import React, { useState, useEffect, useRef } from 'react';
import { Box, Dialog, DialogContent, IconButton, Typography, CircularProgress, Button } from "@mui/material";
import { Chip, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useMediaQuery from '@mui/material/useMediaQuery';
import Slide from '@mui/material/Slide';
import { useTheme } from '@mui/material/styles';
import { useProductStore } from '../store/product';
import SuggestedProducts from "../components/SuggestedProducts";
import SuggestedProductsMobile from "../components/SuggestedProductsMobile";
import FullImageModal from "./FullImageModal"; // Adjust the path
import withLoadingSkeleton from './SkeletonForComponent';  // Import HOC
import { Add, Remove, Delete } from '@mui/icons-material';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Select, MenuItem, FormGroup, FormControl, InputLabel, Checkbox, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";


const ProductDetailsModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  
  const { cartItems } = useProductStore();
  const isStoreOpen = useProductStore((state) => state.isStoreOpen);



  const {
    selectedProduct,
    clearSelectedProduct,
    productSource,
    clearProductSource,
    sortedProducts,
    isCartOpen, setCartOpen,
    checkFulfillmentType,
  } = useProductStore();


 const addToCart = useProductStore((state) => state.addToCart);
 const updateCartItem = useProductStore((state) => state.updateCartItem);



  // 👇 Local temporary quantity (starts from 0)
  const [isLoading, setIsLoading] = useState(false);
  const handleAdd = () => setCustomQuantity((prev) => prev + 1);
  const handleRemove = () =>
    setCustomQuantity((prev) => (prev > 1 ? prev - 1 : 1));



const [missingRequired, setMissingRequired] = useState({});
const requiredRefs = useRef([]);


const [requiredSelections, setRequiredSelections] = useState({}); // move to zustand
const [optionalSelections, setOptionalSelections] = useState([]);

const [specialNote, setSpecialNote] = useState("");
const [customQuantity, setCustomQuantity] = useState(1);
const [basePrice, setBasePrice] = useState(0);
const [showStickyHeader, setShowStickyHeader] = useState(false);




const extraCost = optionalSelections.reduce((sum, opt) => sum + opt.price, 0);
const totalPrice = ((basePrice || 0) + extraCost) * customQuantity;




useEffect(() => {
  if (!selectedProduct?.image) return;

  const onScroll = () => {
    const triggerPoint = 150; // adjust if needed
    setShowStickyHeader(window.scrollY > triggerPoint);
  };

  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, [selectedProduct]);







const handleAddToBag = () => {
  if (customQuantity > 0) {
    if (selectedProduct.requiredOptions && !allRequiredSelected) {
      const missing = {};
      let firstMissingScrolled = false; // 👈 local flag to ensure only the first scroll happens

      selectedProduct.requiredOptions.forEach((opt, index) => {
        if (!requiredSelections[opt.label]) {
          missing[opt.label] = true;

          // Scroll to the first missing only
          if (!firstMissingScrolled) {
            requiredRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" });
            firstMissingScrolled = true;
          }
        }
      });

      setMissingRequired(missing);

      setTimeout(() => {
        setMissingRequired({}); // Reset red chips after 2 seconds
      }, 2000);

    //  alert("Please select all required options before adding to cart.");
      return;
    }


    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

    const customProduct = {
      ...selectedProduct,
      customizations: {
        required: requiredSelections,
        optional: optionalSelections,
        note: specialNote, 
      },
      price: basePrice + extraCost,
      note: [
        ...Object.entries(requiredSelections).map(([key, val]) => `${key}: ${val}`),
        ...optionalSelections.map(
          (opt) => `${opt.name}${opt.price ? ` (+$${opt.price.toFixed(2)})` : ""}`
        ),
        specialNote ? `Note: ${specialNote}` : "", 
      ]
        .filter(Boolean)
        .join(", "),
      uniqueKey:
        selectedProduct._id +
        "-" +
        JSON.stringify(requiredSelections) +
        "-" +
        JSON.stringify(optionalSelections) +
        "-" +
        specialNote,
    };


      addToCart(customProduct, customQuantity);
      setCustomQuantity(1);
      setRequiredSelections({});
      setOptionalSelections([]);
      if (!isMobile) setCartOpen(true);
      handleClose();

      checkFulfillmentType();


    }, Math.floor(Math.random() * 1500) + 300);
  }
};

const handleUpdateItem = () => {

  const prevKey = selectedProduct.uniqueKey || selectedProduct._id;


  setIsLoading(true);
  setTimeout(() => {
    setIsLoading(false);
  const updatedProduct = {
    ...selectedProduct,
    customizations: {
      required: requiredSelections,
      optional: optionalSelections,
      note: specialNote,
    },
    quantity: customQuantity,
    price: basePrice + extraCost,
    note: [
    ...Object.entries(requiredSelections).map(([key, val]) => `${key}: ${val}`),
    ...optionalSelections.map(
      (opt) => `${opt.name}${opt.price ? ` (+$${opt.price.toFixed(2)})` : ""}`
    ),
    specialNote ? `Note: ${specialNote}` : "", 
  ].filter(Boolean).join(", "),
  
    uniqueKey:
      selectedProduct._id +
      "-" +
      JSON.stringify(requiredSelections) +
      "-" +
      JSON.stringify(optionalSelections) +
      "-" +
      specialNote,
  };


  updateCartItem(updatedProduct, prevKey); // 👈 from your Zustand store
  setCustomQuantity(1);
  setSpecialNote('');
  clearSelectedProduct();
  clearProductSource();
  }, Math.floor(Math.random() * 1500) + 300); 

};


useEffect(() => {
  if (!selectedProduct) return;

  if (productSource === "cart" && selectedProduct.customizations) {
    setRequiredSelections(selectedProduct.customizations.required || {});
    setOptionalSelections(selectedProduct.customizations.optional || []);
    setSpecialNote(selectedProduct.customizations.note || "");
    setCustomQuantity(selectedProduct.quantity || 1);




    const prevExtras = selectedProduct.customizations.optional?.reduce(
      (sum, opt) => sum + (opt.price || 0),
      0
    ) || 0;

    const base = selectedProduct.price - prevExtras;
 //   selectedProduct.price = base > 0 ? base : selectedProduct.price; // protect from negatives


    setBasePrice(base > 0 ? base : selectedProduct.price);

  } else {
    // reset if it's a fresh selection

    const initialRequired = {};
    selectedProduct.requiredOptions?.forEach(opt => {
      initialRequired[opt.label] = "";
    });

    setRequiredSelections({});
    setOptionalSelections([]);
    setSpecialNote("");
    setCustomQuantity(1);
    setBasePrice(selectedProduct.price);
  }
}, [selectedProduct, productSource]);



// useEffect(() => {
//   if (selectedProduct) {
//     // Reset required & optional selections
//     const initialRequired = {};
//     selectedProduct.requiredOptions?.forEach(opt => {
//       initialRequired[opt.label] = "";
//     });
//     setRequiredSelections(initialRequired);
//     setOptionalSelections([]);
//     setCustomQuantity(1);
//     setSpecialNote('');
//   }
// }, [selectedProduct]);






// handlers
const handleRequiredChange = (label, value) => {
//  setRequiredSelections(prev => ({ ...prev, [label]: value }));


  setRequiredSelections((prev) => {
      // Create a copy of the selections
      const updated = { ...prev, [label]: value };

      // Rebuild in correct order based on product.requiredOptions
      const ordered = {};
      selectedProduct.requiredOptions.forEach((opt) => {
        if (updated[opt.label] !== undefined) {
          ordered[opt.label] = updated[opt.label];
        }
      });

      return ordered;
    });


if (selectedProduct.requiredOptions && !allRequiredSelected) {
  let firstMissingScrolled = false; 

  selectedProduct.requiredOptions.forEach((opt, index) => {
    if (!requiredSelections[opt.label]) {

      // Scroll to the first missing only
      if (!firstMissingScrolled) {
        requiredRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
        firstMissingScrolled = true;
      }
    }
  });
}

};




// const handleOptionalChange = (option) => {
//   setOptionalSelections((prev) =>
//     prev.some((opt) => opt.name === option.name)
//       ? prev.filter((opt) => opt.name !== option.name)
//       : [...prev, option]
//   );
// };


const handleOptionalChange = (option) => {
  setOptionalSelections((prev) => {
    // Toggle the option
    let updated;
    if (prev.some((opt) => opt.name === option.name)) {
      updated = prev.filter((opt) => opt.name !== option.name);
    } else {
      updated = [...prev, option];
    }

    // Reorder based on product.optionalOptions
    const ordered = [];
    selectedProduct.optionalOptions.forEach((opt) => {
      const match = updated.find((u) => u.name === opt.name);
      if (match) ordered.push(match);
    });

    return ordered;
  });
};


// whether all required fields chosen
const allRequiredSelected =
  !selectedProduct?.requiredOptions ||
  selectedProduct.requiredOptions.every(opt => requiredSelections[opt.label]);














  const scrollContainerRef = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000); // Simulate loading delay
    }

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [selectedProduct]);

 const [isFullImageModalOpen, setFullImageModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const handleClose = () => {
    setCustomQuantity(1);
    clearSelectedProduct();
  };

  const handleImageClick = (image, alt) => {
    setImageSrc(image);
    setImageAlt(alt);
    setFullImageModalOpen(true);
  };

  const handleFullImageModalClose = () => {
    setFullImageModalOpen(false);
  };



  if (!selectedProduct) return null;

  const itemInCart = cartItems.find((item) => item._id === selectedProduct._id);
//  selectedProduct.quantity = itemInCart?.quantity || 0;


  return (
    <>
    <Dialog
      open={Boolean(selectedProduct)}
      onClose={handleClose}
      fullScreen={isMobile}
      PaperProps={{
        style: isMobile
          ? {
              //borderRadius: '16px 16px 0 0',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              height: '100%',
            }
          : {
              borderRadius: '16px',
              width: '550px',
              maxHeight: '85%',
              margin: 'auto',
            },
      }}
      TransitionComponent={isMobile ? Slide : undefined}
      TransitionProps={isMobile ? { direction: 'up' } : undefined}
    >





      <DialogContent
        ref={scrollContainerRef}
        sx={{
          p: 0,
          paddingBottom: isMobile ? '0px' : '0px',
          overflowY: 'auto',
        }}
      >



<>


  <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
        padding: "16px",
        minHeight: '70px',
        borderBottom: '2px solid #d0d0d0',
        zIndex: 5,
      }}
    >


            {/* Product Name */}
      {/* <Typography
        fontFamily="Roboto Slab"
        fontSize= "1.2rem"
        fontWeight="bold"
        color='#ffffffff'
        align="left"
        sx={{ width: "100%", ml: 0 }}
      >
        {selectedProduct.name}
      </Typography> */}


        {/* Close Button — always visible */}
        <Button
          size="small"
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            backgroundColor: '#636363',
            border: '0px solid #000000',
            boxShadow: '-8px 8px 20px rgba(0, 0, 0, 0.2)',
            color: '#fff',
            width: '40px',
            height: '40px',
            minWidth: '40px',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            '&:hover': {
              backgroundColor: '#ececec',
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <CloseIcon />
        </Button>
    </Box>


  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: '80%',
      backgroundColor: "#ffffffff",
      pb: 4,
      m: 0
    }}
  >






<Box
  sx={{
    position: 'relative', // allows absolute positioning of the button
    width: '100%',
    backgroundColor: '#ffffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '0px'

  }}
>

  {/* Close Button — always visible */}
  {/* <Button
    size="small"
    sx={{
      position: 'absolute',
      top: 20,
      right: 20,
      backgroundColor: '#ffffff',
      border: '0px solid #000000',
      boxShadow: '-8px 8px 20px rgba(0, 0, 0, 0.2)',
      color: '#5f5f5fff',
      width: '40px',
      height: '40px',
      minWidth: '40px',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      '&:hover': {
        backgroundColor: '#ececec',
      },
    }}
    onClick={(e) => {
      e.stopPropagation();
      handleClose();
    }}
  >
    <CloseIcon />
  </Button> */}

  {/* Full-width Image (optional) */}
  {selectedProduct.image ? (
    
    <Box
      component="img"
      src={selectedProduct.image}
      alt={selectedProduct.name}
      onClick={() =>
        handleImageClick(selectedProduct.image, selectedProduct.name)
      }
      sx={{
        width: '100%',
        mt: 1,
        mx: 1,
        height: isMobile ? '300px' : isTablet ? '300px' : '350px',
        objectFit: 'cover',
        borderRadius: 2,
        cursor: 'pointer',
      }}
    />
  ) : (
    <></>
    // Optional fallback (e.g., placeholder)
    // <Box
    //   sx={{
    //     width: '100%',
    //     height: isMobile ? '70px' : isTablet ? '70px' : '70px',
    //     backgroundColor: '#222',
    //     borderRadius: 0,

    //   }}
    // />
  )}
</Box>









      {/* Product Details Box */}
      <Box
        sx={{
          width: "100%",
          px: 2, // margin on all sides
          py: 0.5, // margin on all sides
          backgroundColor: '#ffffffff',
          borderBottom: "1px solid #f0f0f0ff"
        }}
      >


      {/* Product Name */}
      <Typography
        fontFamily="Roboto Slab"
        fontSize= "1.26rem"
        fontWeight="bold"
        color='#000000ff'
        align="left"
        sx={{ width: "100%", ml: 0 }}
      >
        {selectedProduct.name}
      </Typography>

        {/* Product Description */}
        <Typography
          variant="body2"
          align="left"
          sx={{
            fontFamily:"Roboto Slab",
            fontSize:"0.8rem",
            width: "100%",
            my: 0,
            color: "#919191ff",
            lineHeight: 1.5,
          }}
        >
          {selectedProduct.description}
        </Typography>
      </Box>





  <Box sx={{ pt: 2, px: 2, width: '100%' }}>
    {/* Required Options */}
    {selectedProduct.requiredOptions?.length > 0 && (
      <Box sx={{ px: 2, pt:2, pb:0.5, mb: 0, backgroundColor: '#f5f5f5', borderRadius: "16px" }}>

        {selectedProduct.requiredOptions.map((opt, i) => (
         <Box key={i} sx={{ mb: 2 }} ref={(el) => (requiredRefs.current[i] = el)}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "0.95rem", fontFamily: "Roboto Slab" }}>
                {opt.label}
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "normal",
                    fontSize: "0.8rem",
                    color: "#888",
                    ml: 0.5,
                    display: "inline",
                  }}
                >
                  (Select 1:)
                </Typography>
              </Typography>

              {/* Required Chip */}
              <Chip
                label="Required"
                size="small"
                sx={{
                  fontSize: "0.75rem",
                  backgroundColor: requiredSelections[opt.label]
                    ? "#4caf50" // green when selected
                    : missingRequired[opt.label]
                    ? "#e66866ff" // red when missing
                    : "#e0e0e0", // gray default
                  color: requiredSelections[opt.label] || missingRequired[opt.label] ? "white" : "black",
                  fontWeight: "bold",
                  ml: 1,
                }}
              />
            </Box>
            <RadioGroup
              value={requiredSelections[opt.label] || ""}
              onChange={(e) => handleRequiredChange(opt.label, e.target.value)}
            >
              {opt.choices.map((choice, i) => (
                  <FormControlLabel  key={i} value={choice} control={<Radio />} label={choice} 
                  sx={{borderBottom: "1px solid #ddd", mx: 0, py: 1.35,           
                    '&:hover': {backgroundColor: '#f5f5f5ff'},
                      }}
                  slotProps={{
                    typography: {
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      fontFamily: "Roboto Slab",
                      color: '#8a8a8aff',
                    },
                  }}
                  />
              ))}
            </RadioGroup>
          </Box>
        ))}

      </Box>
    )}

    {/* Optional Add-ons */}
    {selectedProduct.optionalOptions?.length > 0 && (
      <Box sx={{mt:2, mb:2, px: 2, pt:1, pb:2, backgroundColor: '#f5f5f5', borderRadius: "16px" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
          Optional Add-ons
        </Typography>
        <FormGroup>
          {selectedProduct.optionalOptions.map((opt, idx) => (
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={optionalSelections.some(sel => sel.name === opt.name)}
                  onChange={() => handleOptionalChange(opt)}
                />
              }
              label={`${opt.name} ${
                opt.price ? `(+$${opt.price.toFixed(2)})` : ""
              }`}
              sx={{borderBottom: "1px solid #ddd", mx: 0, py: 1, '&:hover': {
                        backgroundColor: '#f5f5f5ff',
                      }, }}
            />
          ))}
        </FormGroup>
      </Box>
    )}

    
  </Box>





{/* Special Instructions */}
    <Box
      sx={{
        mt: 0,
        px: 2,
        pt: 0,
        pb: 2,
        width: '100%',
        backgroundColor: "#ffffffff",
        borderRadius: "16px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontFamily: "Roboto Slab",
        }}
      >
        Special Instructions
      </Typography>

        <TextField
          fullWidth
          multiline
          minRows={2}
          placeholder="Add a note (e.g. no nuts, no onions)"
          value={specialNote}
          onChange={(e) => {
            if (e.target.value.length <= 100) setSpecialNote(e.target.value);
          }}
          variant="outlined"
          slotProps={{
            htmlInput: { maxLength: 100 }, // replaces inputProps
            input: {
              sx: {
                borderRadius: "12px",
                fontSize: "0.85rem",
                fontFamily: "Roboto Slab",
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        />


      <Typography
        variant="body2"
        sx={{
          fontSize: "0.75rem",
          color: "#9e9e9e",
          mt: 1,
          lineHeight: 1.3,
          fontFamily: "Roboto Slab",
        }}
      >
        We’ll try to fulfill your request, but availability may vary.
      </Typography>
    </Box>
  </Box>
</> 


     </DialogContent>

{!isStoreOpen && (
<Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fdc64fff",
        px: "16px",
        fontFamily: 'Roboto Slab',
        color: '#2b2b2bff',
        textAlign: 'center',
        borderTop: "2px solid #bbb",
      }}
    >

     We're currently closed. <br/>Please order between 11:30AM and 10:30PM.
    </Box>

)

}
      {true && (




<Box
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
        padding: "16px",
        borderTop: "2px solid #bbb",
      }}
    >


      {/* Quantity control box */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          color: "lightgreen",
          borderRadius: 2,
          border: "1px solid #e2e2e2",
          padding: "0 0px",
          width: "135px",
          marginRight: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          size="small"
          sx={{ color: "#727272" }}
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
        >
          {customQuantity === 1 ? (
            <Remove />
          ) : (
            <Remove />
          )}
        </IconButton>

        <Typography
          sx={{
            color: "#727272",
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Roboto Slab",
          }}
        >
          {customQuantity}
        </Typography>

        <IconButton
          size="small"
          sx={{ color: "#727272" }}
          onClick={(e) => {
            e.stopPropagation();
            handleAdd();
          }}
        >
          <Add />
        </IconButton>
      </Box>



      <Button
        sx={{
          display: "flex",
          backgroundColor: customQuantity > 0 ? "primary.main" : "#e0e0e0",
          color: "primary.contrastText",
          fontWeight: "bold",
          fontSize: "1.1rem",
          fontFamily: "Roboto Slab",
          height: "55px",
          textTransform: "none",
          justifyContent: "center",
          alignItems: "center",
          border: '1px solid #00b300',
          borderRadius: 8,
          width: "90%",
        }}
        disabled={customQuantity === 0}
        onClick={
          productSource === "cart" ? handleUpdateItem : handleAddToBag
        }
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          // <>Add To Bag – ${(selectedProduct.price * customQuantity).toFixed(2)}</>
         
          (productSource === "cart" ? `Update Item – $${totalPrice.toFixed(2)}` : `Add To Bag – $${totalPrice.toFixed(2)}`)
         

          

        )}

      </Button>
    </Box>
      )}
    </Dialog>


      {/* Full Image Modal */}
      <FullImageModal
        open={isFullImageModalOpen}
        onClose={handleFullImageModalClose}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />

    </>
      


  );
};

export default ProductDetailsModal;
