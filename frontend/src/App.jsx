import React, {useEffect} from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link, Route, Routes, HashRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FulfillmentPanel from "./components/FulfillmentPanel";
import FixedNavBar from "./pages/FixedNavBar";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import OrderDelivery from "./pages/OrderDelivery";
import OrdersPage from "./pages/OrdersPage";
import OrdersAPITest from "./pages/OrdersAPITest";
import CommonFooter from "./pages/CommonFooter";
import Gallery from "./pages/Gallery";
import MainMenu from "./pages/MainMenu";
import DeliveryInput from "./pages/DeliveryInput";
import Login from "./pages/Login";
import AddressForm from "./pages/ReservationForm";
import ProductsPage from "./pages/ProductsPage";
import Flyer1 from "./pages/Flyer1";
import Sticker from "./pages/Sticker";
import DriverPendingDeliveries from "./pages/DriverPendingDeliveries";
import AdminPage from "./pages/AdminPage";
import StaffLogin from "./pages/StaffLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerStatus from "./pages/CustomerStatus";
import { useMediaQuery, useTheme } from '@mui/material';
import { useProductStore } from './store/product';
import usePageTracking from "./usePageTracking";
import productsByCategory from "./data/ProductsByCategory";
import upsellProducts from "./data/UpsellProducts";
import { imageMap } from './data/imageMap';







function App() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md')); // Returns true if screen width is less than 'md'


  usePageTracking(); // 👈 tracks every route change / analytics

  const setProductsByCategory = useProductStore(
    (state) => state.setProductsByCategory
  );



  const setUpsellProducts = useProductStore((state) => state.setUpsellProducts);

  const updateAspectRatio = useProductStore((state) => state.updateAspectRatio);


  useEffect(() => {
    setProductsByCategory(productsByCategory);
  }, []);


useEffect(() => {
  const upsellsWithImages = Object.fromEntries(
    Object.entries(upsellProducts).map(([category, products]) => [
      category,
      products.map(p => ({
        ...p,
        image: imageMap[p._id] || null,
      }))
    ])
  );

  setUpsellProducts(upsellsWithImages);
}, []);



  useEffect(() => {

  const CLEAR_FLAG = "1"; // bump this when schema changes

  const storedFlag = localStorage.getItem("clearFlag");


  if (storedFlag !== CLEAR_FLAG) {
    Object.keys(localStorage)
      .filter(key => key !== "clearFlag")
      .forEach(key => localStorage.removeItem(key));

    localStorage.setItem("clearFlag", CLEAR_FLAG);
  }

  // console.log({ ...localStorage });


    const handleResize = () => {
      updateAspectRatio();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateAspectRatio]);


useEffect(() => {
  const interval = setInterval(() => {
    useProductStore.getState().refreshStatus();
  }, 60000); // checks every 1 minute

  return () => clearInterval(interval);
}, []);



//"#f7f5f0"
  return (
      <Box px={0} sx={{backgroundColor:'#ffffffff'}}>

          {(!location.pathname.startsWith("/staff")) &&
            
            <FixedNavBar />

        }

       
        {/* <Box pt={'70px'} sx={{backgroundColor:'#fff'}}/> */}
        {/* <Container sx={{  mb: 0, backgroundColor: "#ffffffff", width: { xs: "100%", md: "90%", lg: "70%", xl: "62%" } }}>
          <FulfillmentPanel />
        </Container> */}

        {/* Define Routes for the pages */}
        
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/orderspage" element={<OrdersPage />} />
        <Route path="/ordersapi" element={<OrdersAPITest />} />
        <Route path="/flyer1" element={<Flyer1 />} />
        <Route path="/sticker" element={<Sticker />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/orderdelivery" element={<OrderDelivery />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testpage" element={<AddressForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderplaced" element={<OrderPlaced />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="staff/driver" element={<ProtectedRoute><DriverPendingDeliveries /></ProtectedRoute>} />
        <Route path="staff/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/customerstatus/:orderId" element={<CustomerStatus />} />
        <Route path="/products/:category" element={<ProductsPage />} />
      </Routes>


         {(!location.pathname.startsWith("/staff")) &&
            
             <CommonFooter />

        }
      
        
      </Box>
  );
}

export default App;
