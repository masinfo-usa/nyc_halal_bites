import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import MezquiteOffer from "../images/MezquiteOffer.jpg";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OfferAlert = ({
  open,
  title,
  message,
  onClose,
  onPickupClick,
  onDeliveryClick,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      PaperProps={{
        sx: {
          position: "fixed",
          bottom: 0,
          m: 0,
          width: "100%",
      //    height: "50vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "#fff",
          textAlign: "center",
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* 1x1 Image */}
        <Box
          component="img"
          src={MezquiteOffer}
          alt="Offer"
          sx={{
            width: '100%',
            objectFit: "cover",
            borderRadius: 2,
            mb: 2,
          }}
        />

        <Typography textAlign="center">{message}</Typography>
      </DialogContent>

      <DialogActions
        sx={{
          flexDirection: "column",
          gap: 2,
          px: 3,
          pb: 3,
          width: "100%",
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={onDeliveryClick}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            height: 48,
          }}
        >
          Order Delivery
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={onPickupClick}
          sx={{
            borderColor: "primary.main",
            color: "primary.main",
            height: 48,
          }}
        >
          Order Pickup
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OfferAlert;
