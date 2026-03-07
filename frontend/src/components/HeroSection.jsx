import React from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import foodImage from '../images/food.jpg';
import SlideShow from './SlideShow';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '',
        flexDirection: isMobile ? 'column' : 'column',
        borderBottom: "0px solid lightgreen",
        width: '100%',
        pt: 1.25,
        pb: 3,
        gap: '5%' 

       }}
    >
      <Box
        sx={{
          backgroundColor: '',
          color: '#F84F31',
          display: 'flex',
          flexDirection: 'column',
          px: 0,
          pt: 0,
          pb: 0

        }}
      >
      <SlideShow/>
      </Box>
      


      <Box
        sx={{
          backgroundColor: '',
          color: '#F84F31',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          px: 0,
          mx: 1.5,
          my: 1.5
        }}
      >

  <Typography variant="h4" 
  sx={{
    fontWeight: 'bold',
    fontSize: { xs: '2.5rem', md: '3.0rem' },
    color: '#40af1eff'
  }}
  >
    Mezquite Valley
  </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2.0rem', md: '2.0rem' },
            color: '#fff'
          }}
        >
          Street Tacos and More
        </Typography>


        <Button
              name='order_online'
              href="/products/Typical Dishes"            
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                display: 'flex',
                bgcolor:"lightgreen",
                alignItems: 'center',
                borderRadius: 2, 
                padding: '8px 6px', 
                textTransform: 'none',
                boxShadow: 'none',
                color: '#222',
                fontSize: 20,
                width: {xs:'80%', md:'auto'},
                height: '50px',
                marginTop: 3,
                marginLeft: 0,
                px: 2,
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                Order Pickup ▶
            </Button>


          <Button
              name='order_online'
              href="/orderdelivery"            
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              sx={{
                display: 'flex',
                bgcolor: 'lightgreen',
                alignItems: 'center',
                borderRadius: 2, 
                padding: '8px 6px', 
                textTransform: 'none',
                boxShadow: 'none',
                color: '#222',
                fontSize: 20,
                width: {xs:'80%', md:'auto'},
                height: '50px',
                marginTop: 5,
                marginLeft: 0,
                px: 2,
                '&:hover': {
                  boxShadow: 'none', // Remove shadow on hover
                }, 
              }}>
                Order Delivery ▶
            </Button>


      </Box>

     
    </Box>
  );
};

export default HeroSection;
