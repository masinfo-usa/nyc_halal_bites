import React from 'react';
import { Box, Typography, Container, CardMedia, Avatar, Paper, Divider, IconButton, Link, Button } from '@mui/material';
import { Facebook, Instagram, YouTube, LocationOn, Email, Phone } from '@mui/icons-material';
import HeroSection from '../components/HeroSection';
import YelpReview from '../components/CustomerReviews';
import FAQSection from '../components/FAQSection';

import historyImage from '../images/our-history.png';
import CustomerReviews from '../components/CustomerReviews';

// Sample review data
const reviews = [
  { name: 'Sofia L.', date: 'Apr 10, 2025', comment: 'Best pasta I’ve had in years!' },
  { name: 'Marcus K.', date: 'Apr 5, 2025', comment: 'Friendly staff and cozy vibe.' },
  { name: 'Rina M.', date: 'Mar 28, 2025', comment: 'The desserts were heavenly!' },
];

const HomePage = () => {
  return (
    <Box sx={{width: '100%', px: {xs:'0%', sm:'0%', md:'2%', lg: '8%'}, backgroundColor: '#000'}}>
      <HeroSection />
      
     




      {/* Our History Section */}
      <Box
          display="grid"
          sx={{
            mx: '3%',
            my: 10,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gridTemplateRows: 'auto auto',
            gap: 4,
          }}
        >
          {/* Image */}
          <CardMedia
            component="img"
            image={historyImage}
            alt="Our History"
            sx={{
              borderRadius: 5,
              width: '100%',
              height: 'auto',
              gridColumn: { xs: '1', md: '1' },
              gridRow: { xs: '2', md: '1 / span 2' },
            }}
          />

          {/* Title */}
          <Box
            sx={{
              gridColumn: { xs: '1', md: '2' },
              gridRow: { xs: '1', md: '1' },
              alignSelf: { md: 'end' }, // bottom-align on md+
            }}
          >
            <Typography variant="h3" gutterBottom color="#fff">
              Our History
            </Typography>
          </Box>

          {/* Description */}
          <Box
            sx={{
              gridColumn: { xs: '1', md: '2' },
              gridRow: { xs: '3', md: '2' },
              alignSelf: { md: 'start' }, // top-align on md+
            }}
          >
            <Typography variant="body1" color="#fff">
              Mezquite Valley Street Tacos and More was established years ago with the mission of delivering authentic Mexican street-food flavors to our region. Built on long-standing family recipes and traditional cooking techniques, we set out to create a menu that honors the rich culinary heritage behind every taco and dish we serve.
              <br /><br />              
              From our earliest days to today, our commitment has remained the same: fresh ingredients, bold flavors, and a genuine passion for sharing the true taste of Mexico. 
              <br /><br />
              We are proud of how far we’ve come, and even more excited about continuing to serve our community for years to come.
            </Typography>
          </Box>
        </Box>


        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          color={'#fff'}
          mt={15}
          px={2}
        >
          <Typography variant="h4" component="h2" mb={2}>
            Explore Our Dishes
          </Typography>
          <Typography variant="body1" mb={4} maxWidth="600px">
            Take a closer look at the delicious flavors we serve every day.
            Browse through our handpicked selection of authentic Mexican dishes.
          </Typography>

          <Button
            href="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              display: 'flex',
              bgcolor: "lightgreen",
              alignItems: 'center',
              justifySelf: 'center',
              borderRadius: 2,
              padding: '8px 6px',
              textTransform: 'none',
              boxShadow: 'none',
              color: '#222',
              fontSize: 20,
              width: { xs: '80%', md: '300px' },
              height: '50px',
              mt: 0,
              mb: 5,
              px: 2,
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            View Photo Gallery ▶
          </Button>
        </Box>




      <CustomerReviews />
    
      <FAQSection />
    

      
      
    </Box>
  );
};

export default HomePage;