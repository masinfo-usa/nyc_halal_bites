import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  useMediaQuery,
  Badge,
  Link,
} from "@mui/material";
import { FaGoogle, FaInstagram } from 'react-icons/fa';
import { Phone, Facebook } from '@mui/icons-material';


import { Search as SearchIcon, Menu as MenuIcon, Close as CloseIcon, ShoppingBag, ShoppingBagRounded, ShoppingBagTwoTone, ShoppingBagSharp, LocalMall } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useProductStore } from "../store/product";
import ProductPanel from "../components/ProductPanel";
import UpsellPanel from "../components/UpsellPanel";
import FulfillmentPanel from "../components/FulfillmentPanel";
import ProductDetailsModal from '../components/ProductDetailsModal';
import MezquiteLogo from "../images/MezquiteLogo.png";
import MezquiteLogoFull from "../images/MezquiteLogo - Full.png";
import MezquiteBag from '../images/MezquiteBag.jpg';
import { shallow } from "zustand/shallow";


const theme = createTheme({
  palette: {
    primary: {
      main: "#108910",
    },
    secondary: {
      main: "#f7f5f0",
    },
  },
});

const brightColor = 'lightgreen'

const links = [
  { text: "MAIN MENU", href: "/" },
  // { text: "ORDER PICKUP", href: "/" },
  // { text: "ORDER DELIVERY", href: "/orderdelivery" },
  { text: "GALLERY", href: "/gallery" },
  { text: "ABOUT US", href: "/homepage" },
];





function FixedNavBar() {
  const [isNavOpen, setNavOpen] = useState(false);
  
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(5); // Example item count

  const navigate = useNavigate();

  const placeholders = [
    "Search Product, Recipes, Etc...",
    "Search Chicken Breast",
    "Search Thigh Boneless",
  ];

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);



  const {cartItems, calculateTotalPrice, isCartOpen, setCartOpen, isUpsellOpen, 
    setUpsellOpen, isUpsellChanged, setUpsellChanged, fulfillmentType } = useProductStore();

  const isStoreOpen = useProductStore((state) => state.isStoreOpen);
  

  const upsellProducts = useProductStore((state) => state.upsellProducts);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* position="fixed" */}
      <AppBar position={isMediumScreen ? 'sticky' : 'sticky'} sx={{backgroundColor: "#000", 
      zIndex: theme.zIndex.drawer - 1, boxShadow: 'none', 
      borderBottom: "1px solid #48c54eff",
      p:0,
        
               }}>
        <Toolbar 
        
        sx={{ backgroundColor: 'transparent',//"#f7f5f0",  
        mx:'2%', p:1, 
        boxShadow: 'none' , display:'flex',
        justifyContent: "space-between", // Spread left and right sections
        alignItems: "center", // Center vertically
          
      }}>
          
          {/* MenuIcon */}
          {isMediumScreen && !isSearchFocused && (
            <IconButton
              edge="start"
              onClick={() => setNavOpen(true)}
              sx={{ marginLeft: '0px',
                marginRight: '0px',
                backgroundColor: '', 
                color: brightColor, 
                borderRadius: '8px',
                height: '40px',
               }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* Title */}
          {!(isMediumScreen && isSearchFocused) && (
            <Box sx={{display: "flex", ml:2, backgroundColor: '', alignItems: "center" }} component="a" href="/">
            <img
              src={MezquiteLogo}
              alt="Mezquite Logo"
              style={{ height: 40, width: "auto" }}
              
            />
          </Box>
          )}




{!isMediumScreen && (
          <Box sx={{ display: 'flex', gap: 4, backgroundColor: '' }}>
                {links.map((link) => (
                  <Typography
                    key={link.href}
                    component="a"
                    href={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    sx={{
                      color: 'lightgreen',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontFamily: 'Roboto Slab',
                      px: 1.5,
                      py: 0.5,
                      my: 1,
                      borderRadius: 2,
                      '&:hover': {
                        color: '#000',
                        bgcolor: 'lightgreen',
                      },
                    }}
                  >
                    {link.text}
                  </Typography>
                ))}
              </Box>
)}
           
          {isSearchFocused && isMediumScreen && (
                <Button
                  onMouseUp={() => {
                    setIsSearchFocused(false);
                    setSearchText("");
                  }}
                  sx={{ marginLeft: 1, color:'#fff', textTransform:'none', backgroundColor: '#727272' }}
                >
                  Cancel
                </Button>
              )}
              


          {(!location.pathname.startsWith("/checkout")) ? (
              <Button
              name='cart'
              variant="contained"
              onClick={() => setCartOpen(true)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'primary.main',
                borderRadius: 20, 
                padding: '5px 10px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 0,
                fontWeight: 'bold',
                fontSize: '15px',
                color:'primary.contrastText',
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                <LocalMall sx={{ marginRight: 0, color:'primary.contrastText' }} />
                {cartItems.length}
            </Button>
            )
          :
          (
              <Box
              name='dummy-transparent'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '',
                width: '50px',
                borderRadius: 20, 
                padding: '5px 10px', 
                textTransform: 'none',
                boxShadow: 'none', 
                marginLeft: 0,
                fontWeight: 'bold',
                fontSize: '15px',
                color:'#000',
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
            </Box>
            )
          }
        </Toolbar>

      </AppBar>


      <ProductDetailsModal />
      {/* <ProductDetailsModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        productSource={productSource}
        setProductSource={setProductSource}
      /> */}



<Drawer
  anchor="left"
  open={isNavOpen}
  onClose={() => setNavOpen(false)}
  SlideProps={{
    timeout: {
      enter: 300,
      exit: 300,
    },
    
  }}
  sx={{
    '& .MuiDrawer-paper': {
      width: '100%'
    },
    
  }}
>
  <Box sx={{ width: '100%', height: '100%', 
    padding: 2, position: 'relative', 
    backgroundColor: '#222',
    }}>
    {/* <IconButton
      onClick={() => setNavOpen(false)}
      sx={{
        borderRadius: 2,
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton> */}


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
          position: 'absolute',
          right: 16, // spacing from right edge
          '&:hover': {
            backgroundColor: '#a0a0a0',
          },
        }}
        onClick={() => setNavOpen(false)}
      >
        <CloseIcon sx={{ color: '#fff' }} />
      </Button>




    <Box
          sx={{
            display: 'grid',
          //  gridAutoFlow: 'row',
//            gridTemplateColumns: `repeat(${aspectRatio * 2}, 1fr)`,
            gridTemplateRows: `repeat(auto-fill, minmax(10%, 1fr))`,
            
            rowGap: `${1 * 2}vh`,
            width: '100%',
            mt: '5vh',
            mb: '10%',
            justifyContent:'center',
            fontFamily: 'Roboto Slab',
            backgroundColor: '',
          }}
        >

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "center" },
              alignItems: "center",
              mb: '10%'
            }}
            component="a"
            href="/"
          >
            <img
              src={MezquiteLogoFull}
              alt="Mezquite Logo"
              style={{ height: 120, width: "auto" }}
            />
          </Box>

{links.map(({ text, href }) => (
  <Link
    key={text}
    href={href}
    sx={{
      width: '250px',
      pt: '10px',
      pb: '10px',
      pl: '10px',
      pr: '10px',
      textAlign: 'center',
      fontSize: '20px',
      justifyContent: 'center',
      textDecoration: 'none',
      color: '#fff',  
      backgroundColor: '',
      '&:hover': {
        backgroundColor: '#2bb800ff', // Remove shadow on hover
      },
    }}
  >
    {text}
  </Link>
))}


      </Box>


          <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={1}
          mb={8}
          sx={{ pt: 1, borderTop: '1px solid #777777ff' }}
        >
          <Typography sx={{ fontFamily: 'Roboto Slab', color: '#fff', mb: 1 }}>
            Follow us on Social Media
          </Typography>

          <Box display="flex" gap={2}>
            <IconButton
              sx={{ color: '#fff' }}
              href="https://www.facebook.com/Mezquitevalleysouthoftheborder/"
              target="_blank"
            >
              <Facebook />
            </IconButton>
            <IconButton
              sx={{ color: '#fff' }}
              href="https://www.instagram.com/mezquitevalley/?hl=en"
              target="_blank"
            >
              <FaInstagram size={24} />
            </IconButton>
            <IconButton
              sx={{ color: '#fff' }}
              href="https://www.google.com/search?sca_esv=b2b0647d6414b5de&hl=en&sxsrf=AE3TifPSl7IPxKQSxx7QTHfpk1WNziyWUQ:1762078627431&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_5Hh-q5HrfZdxBkYGJal4eAnauGuwCm9jMZgeX55Wh9-o97RMS4og_VV5iUmkIt3hhlIINdI66_UcQTmuCoPPrb2rOEKeUy51hP_Tkl5p1quuDS0hPKvmW45xDe0vNysTHAGW0%3D&q=Mezquite+Valley+street+tacos+and+more+Reviews&sa=X&ved=2ahUKEwj86p21ntOQAxUwm2oFHY-SPasQ0bkNegQIJBAD&cshid=1762078648041922&biw=2133&bih=1021&dpr=0.9"
              target="_blank"
            >
              <FaGoogle size={24} />
            </IconButton>


          </Box>
        </Box>





  </Box>
</Drawer>


<Drawer
  anchor="right"
  open={isCartOpen}
  onClose={() => setCartOpen(false)}
  SlideProps={{
    timeout: {
      enter: 300,
      exit: 300,
    },
    
  }}
  sx={{
    '& .MuiDrawer-paper': {
      width: {
        xs: "100%",
        sm: "100%",
        md: "50%",
        lg: "30%",
        xl: "25%"
      },
    },
  }}
>
<Box
  name="cartheader"
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70px',
    width: '100%',
    backgroundColor: '#000',
    borderBottom: '2px solid #d0d0d0',
    mb: 0,
  }}
>
  {/* Centered Title */}
  <Typography
    variant="h6"
    sx={{
      backgroundColor: '',
      color: '#fff',
      fontWeight: 'bold',
      fontFamily: 'Roboto Slab',
      display: 'flex',
      justifySelf: 'center',
      alignItems: 'center',
      gap: 1,
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    }}
  >
    <LocalMall sx={{ color: '#fff' }} />
    Your Bag 
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
      position: 'absolute',
      right: 16, // spacing from right edge
      '&:hover': {
        backgroundColor: '#a0a0a0',
      },
    }}
    onClick={() => setCartOpen(false)}
  >
    <CloseIcon sx={{ color: '#fff' }} />
  </Button>
</Box>




    {/* Selected Product Modal */}
         
    
     

    <Box sx={{ px: 1, fontFamily: 'Roboto Slab' }}>
     <FulfillmentPanel fixed  />
    </Box>
 

    {/* Cart Items */}
    
    <Box sx={{ pl: 1, flexGrow: 1, overflowY: 'auto', backgroundColor: '#fff'}}>
      <Typography variant="h6" fontFamily='Roboto Slab' gutterBottom>
        Items in Bag:
      </Typography>
      {cartItems.length === 0 ? (
        <>
        

        <Box
            component="img"
            src={MezquiteBag}
            alt={'Bag'}
            align={'center'}
            sx={{
              display: 'block',     // allows mx: 'auto' to work
              mx: 'auto',           // centers horizontally
              mt: '10vh',  
              width: 'auto',
              height: '17vh',
              objectFit: 'cover',
              borderRadius: 2,
            }}
            onClick={(e) => {
           
            }}
          />
        <Typography fontFamily='Roboto Slab' fontSize={'1.3rem'} color={'#aaa'} align={'center'}>No items in the bag.</Typography>


         <Button
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '30px',
              color: 'primary.contrastText',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              fontFamily: 'Roboto Slab',
              width: '80%',
              height: '50px',
              mt: '10vh',
              mx: '10%',
              textTransform: 'none', // Prevent capitalization
              position: 'relative', // Relative positioning for internal elements
              display: 'flex',
              justifyContent: 'center', // Center the text
              alignItems: 'center', // Align text vertically
              border: '1px solid #00b300',
            }}
            onClick={() => {
              window.scrollTo(0, 0);
              navigate("/products/Typical Dishes");
              setCartOpen(false);
            }}
          >
    
            + Add Items

          </Button>
        </>
      ) : (
        
    <>
      {/* All ProductPanels */}
      {cartItems.map((item) => (
        <ProductPanel key={item.uniqueKey || item._id} product={item} />
      ))}

      {/* Add Items button AFTER ProductPanels */}
      <Button
        sx={{
          backgroundColor: '#eee',
          borderRadius: '10px',
          color: '#000',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          fontFamily: 'Roboto Slab',
          width: '90%',
          height: '50px',
          mt: '4vh',
          mb: '4vh',
          mx: '5%',
          textTransform: 'none',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {

          if (!location.pathname.startsWith("/products")) {
            navigate("/products/Typical Dishes");
          }

          setCartOpen(false);
        }}

      >
        + Add More Items
      </Button>
    </>

        
      )}
    </Box>
    {/* Checkout */}
{(cartItems.length !== 0) && (    
              <Box
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 10,
                    alignContent:'center',
                  // height: '150px',
                    p: '10px 10px 30px 10px',
                    borderTop: '2px solid lightGreen',
                    backgroundColor: '#222',
                  }}
                >


      <Typography
        sx={{
          color: "#eee",
          textAlign: "center",
          fontWeight: "normal",
          fontSize: "0.95rem",
          fontFamily: "Roboto Slab",
          mt: 0.5,
          mb: 1.5,
        }}
      >
        {(() => {
          const total = calculateTotalPrice();

          if (!isStoreOpen) {
            return (
              <>
                We're currently closed.
                <br />
                Please order between 11:30AM and 10:30PM.
              </>
            );
          }

          if (fulfillmentType === "delivery") {
            if (total < 15) {
              return (
                <>
                  Minimum order amount for delivery is $15.00
                  <br />
                  Please add more items.
                </>
              );
            } else if (total >= 35) {
              return (
                <>
                  You saved the delivery fee!
                </>
              );
            } else {
              return (
                <>
                Spend ${(35 - total).toFixed(2)} more and get free delivery!
                </>
              );
            }
          }

          // For non-delivery orders
          return <>Order Type: {fulfillmentType.toUpperCase()}</>;
        })()}
      </Typography>



      <Button
        disabled = {!isStoreOpen || (fulfillmentType === "delivery" && calculateTotalPrice() < 15)}
        sx={{
          backgroundColor: (isStoreOpen && (fulfillmentType === "pickup" || (fulfillmentType === "delivery" && calculateTotalPrice() > 15))) ? 'primary.main' : "grey",
          borderRadius: '30px',
          color: 'primary.contrastText',
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
          border: '1px solid #00b300',  
        }}
       onClick={() => {
          const total = calculateTotalPrice();

          // if (fulfillmentType === "delivery" && total < 15) {
          //   alert(
          //     `The current cart total of $${total} does not meet the minimum order amount of $15.00. Please add more items to your cart.`
          //   );
          //   return;
          // }

          
          const UPSELL_KEY = "lastUpsellShownAt";
          const ONE_HOUR = 60 * 60 * 1000; // ms



          const lastShown = localStorage.getItem(UPSELL_KEY);
          const now = Date.now();

          // If upsell was shown within the last hour → skip it
          if (lastShown && now - Number(lastShown) < ONE_HOUR) {
            window.scrollTo(0, 0);
            navigate("/checkout", { state: { cartItems } });
            setCartOpen(false);
            setUpsellOpen(false);
            return;
          }

          // Otherwise show upsell
          setUpsellOpen(true);
          localStorage.setItem(UPSELL_KEY, Date.now().toString());


          
        }}
      >
      
        Go to checkout
        <Box
          sx={{
            position: 'absolute',
            right: '16px', // Position from the right side
            backgroundColor: '#015c0d',
            color: 'primary.contrastText',
            border: '1px solid #00b300',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            px: 2,
            py: 0.5,
            borderRadius: '20px',
          }}
        >
          ${calculateTotalPrice()}
        </Box>
      </Button>
    </Box>
  )}

</Drawer>



<Drawer
  anchor="right"
  open={isUpsellOpen}
  onClose={() => setUpsellOpen(false)}
  SlideProps={{
    timeout: {
      enter: 300,
      exit: 300,
    },
    
  }}
  sx={{
    '& .MuiDrawer-paper': {
      width: {
        xs: "100%",
        sm: "100%",
        md: "50%",
        lg: "30%",
        xl: "25%"
      },
    },
  }}
>
<Box
  name="cartheader"
  sx={{
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '70px',
    width: '100%',
    backgroundColor: '#222',
    borderBottom: '2px solid #d0d0d0',
    mb: 0,
  }}
>
  {/* Centered Title */}
  <Typography
    variant="h6"
    sx={{
      color: '#90ee90',
      fontWeight: 'bold',
      fontFamily: 'Roboto Slab',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      position: 'absolute',
    }}
  >
    Complete Your Meal! 
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
      position: 'absolute',
      right: 16, // spacing from right edge
      '&:hover': {
        backgroundColor: '#a0a0a0',
      },
    }}
    onClick={() => setUpsellOpen(false)}
  >
    <CloseIcon sx={{ color: '#fff' }} />
  </Button>
</Box>




     




    {/* Cart Items */}
<Box sx={{ pl: 0, flexGrow: 1, overflowY: 'auto', backgroundColor: '#fff' }}>
  {/* <Typography
    variant="h6"
    fontFamily="Roboto Slab"
    fontSize={'1.1rem'}
    gutterBottom
    sx={{ mt: 1, mb: 2 }}
  >
    Add your favorites before checking out...
  </Typography> */}

  {Object.entries(upsellProducts).map(([category, products]) => (
    <Box key={category} sx={{ mb: 3, }}>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        sx={{mx:0, mt: 0, mb: 1, textAlign: 'center', backgroundColor: '#eee', 
          borderRadius: 0, color: '#000', pt: 1, borderBottom: '3px solid #90ee90' }}
      >
        {category}
      </Typography>

      {products.map((product) => (
        <UpsellPanel key={product._id} product={product} />
      ))}
    </Box>
  ))}
</Box>

    {/* Checkout */}
{(cartItems.length !== 0) && (    
              <Box
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 10,
                    alignContent:'center',
                  // height: '150px',
                    p: '10px 10px 30px 10px',
                    borderTop: '2px solid lightGreen',
                    backgroundColor: '#222',
                  }}
                >


    <Typography
          sx={{
            color: isUpsellChanged ? '#fff' : '#90ee90',
            textAlign: 'center',
            fontWeight: 'normal',
            fontSize: '0.9rem',
            fontFamily:'Roboto Slab',
            mb: 1,
          }}
        >
      {isStoreOpen 
      ? <> Order Subtotal: ${calculateTotalPrice()} </>
      :   <>
          We're currently closed.<br /> Please order between 11:30AM and 10:30PM.
        </>}
        
        </Typography>


      <Button
        disabled = {!isStoreOpen}
        sx={{
          backgroundColor: isUpsellChanged ? 'primary.main' : brightColor,
          borderRadius: '30px',
          color: isUpsellChanged ? 'primary.contrastText' : '#000',
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
          border: '1px solid #00b300',

        }}
        onClick={() => {
          window.scrollTo(0, 0);
          navigate("/checkout", { state: { cartItems } });
          setCartOpen(false);
          setUpsellOpen(false);

        //  alert('Proceeding to checkout!');
        }}
      >
      
        {isUpsellChanged ? "Done" : "Skip"}
        {/* <Box
          sx={{
            position: 'absolute',
            right: '16px', // Position from the right side
            backgroundColor: '#353535ff',
            color: isUpsellChanged ? brightColor : "#fff",
            fontSize: '0.9rem',
            fontWeight: 'bold',
            px: 2,
            py: 0.5,
            borderRadius: '20px',
          }}
        >
          ${calculateTotalPrice()}
        </Box> */}
      </Button>
    </Box>
  )}

</Drawer>




    </ThemeProvider>
  );
}

export default FixedNavBar;
