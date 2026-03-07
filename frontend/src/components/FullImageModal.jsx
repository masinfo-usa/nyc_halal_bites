import React from 'react';
import { Dialog, IconButton, Box } from "@mui/material";
import { Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const FullImageModal = ({ open, onClose, imageSrc, imageAlt }) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));



  return (
    <Dialog
      open={open}
      onClose={onClose}
     // fullScreen
     PaperProps={{
        style: {
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          borderRadius: isMobile ? '0' : '16px',
          maxWidth: isMobile ? '100%' : '550px',
          maxHeight: isMobile ? '100%' : '85%',
          margin: 'auto',
          
        },
      }}

     

    >

          {/* Close Button — always visible */}
  <Button
    size="small"
    sx={{
      position: 'absolute',
      top: 20,
      left: 20,
      backgroundColor: '#f7f7f7ff',
      border: '0px solid #000000',
      boxShadow: '-8px 8px 20px rgba(255, 255, 255, 0.2)',
      color: '#5f5f5fff',
      width: '50px',
      height: '50px',
      minWidth: '50px',
      borderRadius: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      '&:hover': {
        backgroundColor: '#ececec',
      },
    }}
    onClick={onClose}
  >
    <ArrowBackIcon />
  </Button>

      <TransformWrapper
        initialScale={isMobile ? 1 : 1} // Start at 50% scale
        initialPositionX={0} // Center horizontally
        initialPositionY={0} // Center vertically
        maxScale={2}         // Allow zooming up to 200% scale
     //   minScale={0.5}       // Minimum scale (50% of original)
        centerOnInit={true}  // Center the image initially
        doubleClick={{
          step: 1,         // Amount to zoom in/out on double click or tap
          mode: "toggle",    // Alternates between zoom-in and zoom-out
        }}
      >
        <TransformComponent>
          <img
            src={imageSrc}
            alt={imageAlt}
            style={{
              width: isMobile ? '100vw' : "550px",   // Make the image scale to the full viewport width
              height: isMobile ? '100vh' : "85vh",  // Make the image scale to the full viewport height
              objectFit: "contain",  // Maintain aspect ratio while scaling
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </Dialog>
  );
};

export default FullImageModal;
