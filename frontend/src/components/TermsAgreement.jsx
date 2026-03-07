import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Dialog, DialogContent} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';


import useMediaQuery from '@mui/material/useMediaQuery';

export default function TermsAgreement() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {

        setOpen(false);
  };



  return (
    <>
      <Box sx={{ mt: 0, textAlign: "center" }}>
        <Typography variant="body2">
          By continuing, you agree to the{" "}
          <Typography
            component="span"
            sx={{
              color: "primary.main",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: 500,
            }}
            onClick={() => setOpen(true)}
          >
            Terms & Conditions
          </Typography>
        </Typography>
      </Box>

<Dialog
  open={open}
  onClose={handleClose}
  fullScreen={isMobile}
  PaperProps={{
    style: isMobile
      ? {
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
    sx={{
      p: 0,
      overflowY: 'auto',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Header */}
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
        mb: 1,
        p: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#fff',
          fontWeight: 'bold',
          fontFamily: 'Roboto Slab',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        Terms & Conditions
      </Typography>

      {/* Close Button */}
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
          right: 16,
          '&:hover': {
            backgroundColor: '#a0a0a0',
          },
        }}
        onClick={() => setOpen(false)}
      >
        <CloseIcon sx={{ color: '#fff' }} />
      </Button>
    </Box>

    {/* Scrollable Terms & Conditions Content */}
  
  <Box sx={{ p: 3, display:'flex', flexDirection: 'column', gap: 2}}>
   
      <Typography variant="body2" gutterBottom>
        The terms 'we' or 'our' refer to Mezquite Valley Street Tacos & More. Our terms and conditions are subject to change without notice.
      </Typography>

      <Typography variant="body2" gutterBottom>
        By using our services or placing an order, you are agreeing to the terms below. To the extent permitted by law, we disclaim liability from any issues arising from the use of our website, mobile ordering system, or food truck services.
      </Typography>

      <Typography variant="body2" gutterBottom>
        Orders that have been submitted cannot be modified. If an order is scheduled for a future date, we may allow changes. Please contact us immediately to request changes.
      </Typography>

      <Typography variant="body2" gutterBottom>
        We reserve the right to cancel any order at our discretion. Reasons may include unavailable ingredients, errors in pricing, or logistical issues. We will inform you of cancellations and issue refunds when applicable. We are not liable for any damages resulting from order cancellations.
      </Typography>

      <Typography variant="body2" gutterBottom>
        If you wish to cancel your order, please contact us immediately. Cancellation is at our discretion. If the food has not yet been prepared, we will generally allow a cancellation and refund. Once preparation has started, orders cannot be canceled.
      </Typography>

      <Typography variant="body2" gutterBottom>
        Refunds may be issued at our discretion, either partially or fully, depending on the circumstances. Refunds will not be issued for incorrect menu choices. If you believe your order was not prepared as requested, please contact us. Refunds will be returned via the original payment method and may take 3-5 business days.
      </Typography>

      <Typography variant="body2" gutterBottom>
        Mezquite Valley Street Tacos & More takes food safety seriously. All food is prepared in compliance with local health regulations. We are not responsible for allergic reactions or health issues resulting from consumption. Customers should review ingredients and notify staff of any allergies.
      </Typography>

      <Typography variant="body2" gutterBottom>
        We accept credit and debit cards for orders. Attempted chargebacks for non-fraudulent transactions may be investigated and prosecuted to the fullest extent of the law.
      </Typography>

      <Typography variant="body2" gutterBottom>
        Prices do not include tax. Applicable sales tax will be added to your order at the time of payment. The current tax rate is 8.25% for state and local taxes combined.
      </Typography>

      <Typography variant="body2" gutterBottom>
        For delivery orders placed through our online ordering platform, an 8% online ordering platform fee will be applied to the order subtotal (before taxes, delivery fees or gratuities). This fee covers the costs associated with operating, maintaining, and supporting our online ordering systems and related technology services. 
      </Typography>


      <Typography variant="body2" gutterBottom>
        All images, content, and branding are copyright Mezquite Valley Street Tacos & More or our licensors and may not be used without written permission. This website may be printed for personal use but cannot be used for commercial purposes.
      </Typography>

      <Typography variant="body2" gutterBottom>
        Your privacy is important to us. We only collect necessary information and will not share it except to comply with the law or improve our service. Third-party tracking like Google Analytics may be used, but will not be linked to personal information.
      </Typography>

      <Typography variant="body2" gutterBottom>
        By using this website or our mobile ordering platform, you agree to our terms and conditions. We strive to ensure accurate menu information but are not liable for errors or missing information. Third-party content may be included but is not endorsed by us.
      </Typography>

      <Typography variant="body2" gutterBottom>
        By agreeing to our terms and conditions when placing an order, you consent to receive calls, text messages, and/or emails related to your order or promotional offers, including specials and events. Message and data rates may apply. Frequency of messages may vary.
      </Typography>

      <Typography variant="body2" gutterBottom>
        These are the Terms & Conditions for Mezquite Valley Street Tacos & More. By placing an order or using our services, you acknowledge that you have read, understood, and agreed to these terms.
      </Typography>
    </Box>





  </DialogContent>
</Dialog>


    </>
  );
}
