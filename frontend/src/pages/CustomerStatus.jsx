import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";

const STATUS_STEPS = [
  { label: "Placed", icon: <CheckCircleIcon />, key: "placed" },
  { label: "Out for delivery", icon: <LocalShippingIcon />, key: "out_for_delivery" },
  { label: "Delivered", icon: <HomeIcon />, key: "delivered" },
];

export default function CustomerStatus() {
  const { orderId } = useParams();
  const [status, setStatus] = useState(null);
  const [order, setOrder] = useState(null); // Add this

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const fetchStatus = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error("Order not found");
      }


      setStatus(data.status);
      setOrder(data.order);   // <-- save full order

      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchStatus();
  }, [orderId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !status) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Order not found
        </Typography>
        <Typography sx={{ mt: 1, color: "#666" }}>
          Please check your link or contact the restaurant.
        </Typography>
      </Box>
    );
  }

const activeStep = STATUS_STEPS.findIndex(step => step.key === status);

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: "auto" }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
          <Typography variant="h6">Order Status</Typography>
          <Button size="small" variant="outlined" onClick={fetchStatus}>
            Refresh
          </Button>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STATUS_STEPS.map((step, index) => (
            <Step key={step.key}>
              <StepLabel icon={step.icon} 
                sx= {{
                    color:
                    index < activeStep
                        ? "success.main"     // Completed steps → green
                        : index === activeStep
                        ? "primary.main"     // Current active step → primary
                        : "#ccc",            // Future steps → gray
                }}>
                    <Typography
                    sx={{
                        fontWeight: index <= activeStep ? "bold" : "normal",
                        color: index <= activeStep ? "black" : "#888",
                    }}
                    >
                    {step.label}
                    </Typography>
                    </StepLabel>
            </Step>
          ))}
        </Stepper>
        
<Box sx={{ mt: 4, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
  <Typography variant="h6" sx={{ mb: 1 }}>
    Order Details
  </Typography>

  <Typography>
    <strong>Order for:</strong> {order.customerId.name}
  </Typography>


  <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>Items:</Typography>
  {order.items.map((item, idx) => (
    <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
      <span>
        {item.quantity} × {item.name}
      </span>
      {/* <span>${(item.price / 100).toFixed(2)}</span> */}
    </Box>
  ))}

  <Box sx={{ mt: 2, borderTop: "1px solid #ccc", pt: 1 }}>

    <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", mt: 1 }}>
      <span>Order Total:</span>
      <span>${(order.pricing.total).toFixed(2)}</span>
    </Box>
  </Box>
</Box>
   


        {/* <Typography sx={{ mt: 3, fontSize: 13, color: "#666", textAlign: "center" }}>
          This page updates automatically as your order progresses.
        </Typography> */}
      </Paper>
    </Box>
  );
}
