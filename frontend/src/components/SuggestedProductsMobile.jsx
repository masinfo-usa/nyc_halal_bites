import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";

const SuggestedProductsMobile = ({ products }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    // Reset scroll position to 0 when 'products' changes
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [products]); // Dependency array ensures effect runs when 'products' changes

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h6" sx={{ ml: '0px', mb: '12px', fontFamily: 'Roboto Slab', fontWeight: 'bold' }}>
         Related Suggestions:
    </Typography>
      {/* Horizontal Scrollable Grid */}
      <Box
        ref={scrollContainerRef}
        sx={{
          backgroundColor: "#fff",
          display: "grid",
          gridAutoFlow: "column", // Arrange items in a single horizontal row
          gridAutoColumns: "35%", // Each item explicitly takes up 40% of the width
          columnGap: "5%", // Spacing between items
          overflowX: "auto", // Enable horizontal scrolling
          scrollSnapType: "x mandatory", // Snap to grid items while scrolling
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for a cleaner look
          },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default SuggestedProductsMobile;
