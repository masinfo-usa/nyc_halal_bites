import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const SuggestedProducts = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the start index of the visible items
  const {currentAspectRatio } = useProductStore();
  
  const itemsPerPage = currentAspectRatio > 1.35 ? 5 : (currentAspectRatio > 1 ? 4 : (currentAspectRatio > 0.7 ? 3 : 2));
  
  // Compute the slice of products to show
  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage);

  useEffect(() => {
    setCurrentIndex(0);    
  }, [products]); // Dependency array ensures effect runs when 'products' changes

  
  // Handlers for navigation buttons
  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (

    

    <Box sx={{ width: "100%", overflow: "hidden", position: "relative", padding: "1rem" }}>
      <Typography variant="h6" sx={{ margin: '24px', fontFamily: 'Roboto Slab', fontWeight: 'bold' }}>
      Related Suggestions:
    </Typography>
      {/* Navigation Buttons */}
      <IconButton
        onClick={handlePrev}
        disabled={currentIndex === 0}
        sx={{
          position: "absolute",
          top: "150px",
          left: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "yellow",
          color: '#000',
          border: '1px solid #000',
          boxShadow: 1,
          "&:disabled": {
            opacity: 0.5,
          },
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        disabled={currentIndex + itemsPerPage >= products.length}
        sx={{
          position: "absolute",
          top: "150px",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: "yellow",
          color: '#000',
          border: '1px solid #000',
          boxShadow: 1,
          "&:disabled": {
            opacity: 0.5,
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Grid Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${itemsPerPage}, 1fr)`, // Fixed 5 columns
          gap: 3,
          width: "100%",
          px: '5%'
        }}
      >
        {visibleProducts.map((product, index) => (
          <ProductCard key={product._id} product={product} />
          
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedProducts;
