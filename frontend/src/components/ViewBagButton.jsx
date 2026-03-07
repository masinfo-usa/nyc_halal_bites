import { Box, Button, Slide, Typography } from "@mui/material";
import { LocalMall } from "@mui/icons-material";
import { useProductStore } from "../store/product";

export default function ViewBagButton({ isCartOpen, onClick }) {
  const cartItems = useProductStore((state) => state.cartItems);

  const {selectedProduct} = useProductStore();


  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const brightColor = "primary.main";
  const showButton = itemCount > 0 && !isCartOpen && !selectedProduct;

  return (
    <Slide direction="up" in={showButton} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          bottom: 30,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <Box sx={{ position: "relative", width: "85%" }}>
          <Button
            variant="contained"
            onClick={onClick}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              backgroundColor: brightColor,
              borderRadius: 50,
              padding: "12px 22px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#000",
              border: '1px solid #00b300',
              "&:hover": {
                backgroundColor: "#9EE37D",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            {/* Left: Bag Icon */}
            <LocalMall sx={{ position: "absolute", left: 20, color: "primary.contrastText" }} />

            {/* Center: Text */}
            <Typography
              sx={{
                textAlign: "center",
                flex: 1,
                color: "primary.contrastText",
              }}
            >
              View Bag 
              {/* ({itemCount}) */}
            </Typography>

            {/* Right: Floating Total Badge */}
            <Box
              sx={{
                position: "absolute",
                right: "14px",
                top: "10px",
                backgroundColor: "#015c0d",
                color: 'primary.contrastText',
                fontSize: "0.9rem",
                fontWeight: "bold",
                px: 2,
                py: 0.3,
                borderRadius: "20px",
                boxShadow: "0 2px 6px rgba(255, 255, 255, 0.2)",
                border: '1px solid #00b300',

              }}
            >
              ${totalPrice}
            </Box>
          </Button>
        </Box>
      </Box>
    </Slide>
  );
}
