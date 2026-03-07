import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Typography, Tabs, Tab } from "@mui/material";
import ProductCard from "../components/ProductCard";
import ProductCardFlat from "../components/ProductCardFlat";
import UpsellPanel from "../components/UpsellPanel";
import FulfillmentPanel from "../components/FulfillmentPanel";
import ViewBagButton from '../components/ViewBagButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




import { useProductStore } from "../store/product";



// // Import all PNG and JPG product images eagerly
// const productImages = import.meta.glob(
//   ['../images/products/*.png', '../images/products/*.jpg', '../images/products/*.jpeg'],
//   { eager: true }
// );

// // Convert file paths into a usable image map (filename → imported URL)
// const imageMap = Object.fromEntries(
//   Object.entries(productImages).map(([path, module]) => [
//     path.split('/').pop().replace(/\.(png|jpg|jpeg)$/, ''), // remove extension
//     module.default,
//   ])
// );


import { imageMap } from '../data/imageMap';

//const imageSrc = imageMap[p._id];



   
     
export default function ProductsPage() {
  const { category } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {isCartOpen, setCartOpen, cartItems, productsByCategory} = useProductStore();









  const categories = Object.keys(productsByCategory);









  const sectionRefs = useRef({});
  categories.forEach((cat) => {
    if (!sectionRefs.current[cat]) {
      sectionRefs.current[cat] = React.createRef();
    }
  });

  const [activeTab, setActiveTab] = useState(
    categories.indexOf(category) !== -1 ? categories.indexOf(category) : 0
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    isProgrammaticScroll.current = true;

    sectionRefs.current[categories[newValue]].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  setTimeout(() => {
    isProgrammaticScroll.current = false;
  }, 1200); // match smooth scroll duration

  };



const observerRef = useRef(null);
const isProgrammaticScroll = useRef(false);

  // Scroll to category from URL on first load
  useEffect(() => {
    if (category && sectionRefs.current[category]) {
      sectionRefs.current[category].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [category]);


useEffect(() => {
  const observerOptions = {
    root: null,
    rootMargin: "-120px 0px -80% 0px",
    threshold: 0,
  };

  const observerCallback = (entries) => {
    if (isProgrammaticScroll.current) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = categories.findIndex(
          (cat) => sectionRefs.current[cat].current === entry.target
        );
        if (index !== -1) setActiveTab(index);
      }
    });
  };

  observerRef.current = new IntersectionObserver(
    observerCallback,
    observerOptions
  );

  categories.forEach((cat) => {
    const el = sectionRefs.current[cat]?.current;
    if (el) observerRef.current.observe(el);
  });

  return () => observerRef.current?.disconnect();
}, [categories]);



useEffect(() => {
  const onUserScroll = () => {
    isProgrammaticScroll.current = false;
  };

  window.addEventListener("wheel", onUserScroll, { passive: true });
  window.addEventListener("touchmove", onUserScroll, { passive: true });

  return () => {
    window.removeEventListener("wheel", onUserScroll);
    window.removeEventListener("touchmove", onUserScroll);
  };
}, []);



  return (
    <Container sx={{ mt: 1, mb: 5, backgroundColor: "#ffffffff", width: { xs: "100%", md: "90%", lg: "70%", xl: "60%" } }}>
      {/* Sticky Tabs */}

    <FulfillmentPanel />
    
    <Box
      sx={{
        position: "sticky",
        top: 55, //70
        zIndex: 1000,
        backgroundColor: "#222",
        width: 'calc(100% + 32px)', // compensates for Container padding
        height: 'fit-content',
        ml: -2, // negative margin to offset Container padding (2 = 16px)
        mr: -2,
        mt: 1,
        boxShadow: "0px 4px 7px -4px rgba(0, 0, 0, 0.25)",
        borderTop: "0px solid #48c54eff",
   //     borderBottom: "2px solid #48c54eff",
        // borderBottomLeftRadius: 12,   // 👈 adjust radius as needed
        // borderBottomRightRadius: 12,  // 👈        
       
      }}
    >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          
          sx={{ 
            pl: 0,
            pr: 2,
            "& .MuiTabs-indicator": {
            backgroundColor: "#000", // 👈 underline color
            height: 0,
            borderRadius: 10,
          }, 
          }}
        >
          {categories.map((cat) => (
            <Tab key={cat} label={cat} 
            sx={{backgroundColor: '#ffffffff', 
              border: '2px solid #eee', 
              borderRadius: 16, mx:1, my:1,
              "&.Mui-selected": {
                backgroundColor: "primary.main",
                border: '1px solid #00b300',
                color: "#fff", // 👈 active tab text color
                fontWeight: 600,
              },
            
            }}/>
          ))}
        </Tabs>
      </Box>

      {/* Product sections */}
      {categories.map((cat) => (
        <Box
          key={cat}
          ref={sectionRefs.current[cat]}
          sx={{ pt: 0, pb: 5, mb: 2, scrollMarginTop: "125px", borderBottom: '1.5px solid #48c54eff' }} // offset for sticky tabs
          
        >
          <Typography variant="h5" fontWeight="bold"  sx={{mb: 2, color: '#48c54eff'}}>
            {cat}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              },
              gap: 2,
              
            }}
          >
            {productsByCategory[cat].map((p) => {
              const imageSrc = imageMap[p._id];// || imageMap['no_image'];
              const productWithImage = { ...p, image: imageSrc }; // Attach dynamically
              return <ProductCardFlat key={p._id} product={productWithImage} />;
            })}
          </Box>

{/* <Box>
  {upsellProductsGlobal.map(product => (
    <UpsellPanel key={product._id} product={product} />
  ))}
</Box> */}


        </Box>

      ))}
      {isMobile && (
            <ViewBagButton
              isCartOpen={isCartOpen}      // pass your cart drawer/modal state here
              onClick={() => setCartOpen(true)}  // opens the cart when tapped
            />

          )}
      
    </Container>
  );
}
