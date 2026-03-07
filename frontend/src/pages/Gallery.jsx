import React, { useState } from 'react';
import { Box, Typography, Modal, IconButton, Drawer, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { imageMap } from '../data/imageMap';



const SKIP_IDS = [
  'p10_1', 'p10_2', 'p10_3', 'p10_4',
  'p11_1', 'p11_2', 'p11_3', 'p11_4', 'p11_5',
];

const images = Object.entries(imageMap)
  .filter(([name]) => !SKIP_IDS.includes(name))
  .map(([, src]) => src);



const captions = [
  { title: 'Inner Patio', desc: 'Relax in our cozy inner patio, sheltered under a charming roof with bright windows all around.' },
  { title: 'Outer Patio', desc: 'Enjoy the vibrant energy of downtown Cary from our sunny outer patio, right at the corner of Chatham Street and N Dixon Avenue.' },
  { title: 'Outer Patio', desc: 'Dine outdoors with a lively view of Chatham St and N Dixon Ave — the perfect spot to soak in the town’s charm.' },
  { title: 'Tacos', desc: 'Soft or hard tortillas filled with meat, beans, and toppings like salsa and cilantro.' },
  { title: 'Gordita', desc: 'Thick, soft tortilla filled with meats or cheese, often fried for crispiness.' },
  { title: 'Al Pastor Tacos', desc: 'Tacos with marinated pork, grilled on a vertical spit, and topped with pineapple.' },
  { title: 'Carne Asada', desc: 'Grilled, seasoned beef often served in tacos or burritos.' },
  { title: 'Tacos', desc: 'Crispy or soft tortillas filled with various meats, vegetables, and cheese.' },
  { title: 'Plátanos fritos', desc: 'Sweet plantains fried until golden and crispy, often served as a side dish.' },
  { title: 'Tacos', desc: 'Spicy meat-filled tacos, usually garnished with salsa, cilantro, and onions.' },
  { title: 'Flautas', desc: 'Rolled, crispy tortillas filled with chicken or beef, often served with sour cream.' },
  { title: 'Tostadas', desc: 'Crispy tortillas topped with beans, meats, lettuce, cheese, and salsa.' },
  { title: 'Sope', desc: 'Thick tortilla base topped with beans, meat, cheese, and salsa.' },
  { title: 'Tacos Basket', desc: 'Assorted tacos served with fresh toppings and garnished with radishes.' },
  { title: 'Mojarra', desc: 'Fried whole fish served with rice, beans, and vegetables.' },
  { title: 'Carnitas', desc: 'Slow-cooked pork, shredded and served in tacos, burritos, or as a main dish.' },
  { title: 'Sopes', desc: 'Thick corn cakes topped with beans, cheese, lettuce, and your choice of meat.' },
  { title: 'Tacos De Camarón', desc: 'Shrimp tacos, often topped with spicy sauces and fresh vegetables.' },
  { title: 'Caldo de Res', desc: 'A flavorful beef soup with vegetables and herbs, often served with rice.' },
  { title: 'Tex-Mex', desc: 'A fusion of Texas and Mexican cuisine, with dishes like nachos and fajitas.' },
  { title: 'Tortas', desc: 'Mexican sandwiches made with crusty bread, filled with meats, beans, and avocados.' },
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    if (window.innerWidth <= 800) {
      setDrawerOpen(true);
    } else {
      setOpen(true);
    }
  };

  const handleCloseModal = () => setOpen(false);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectedImage = images[selectedIndex];
  const selectedTitle = captions[selectedIndex]?.title;
  const selectedDesc = captions[selectedIndex]?.desc;

  return (
    <Box
      sx={{
        // display: 'grid',
        // gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr' },
        // gap: 3,
        // py: 2,
        // alignItems: 'flex-start',
        
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        backgroundColor: '',
        gap: 1,
        py: 2, 
        alignItems: 'flex-start',
        justifySelf: 'center',
        width: { xs: '100%', lg: '90%' },

      }}
    >
      {images.map((src, index) => (

        <Box
          key={index}
          sx={{
            position: 'relative',
            borderRadius: 2,
            border: '2px solid #afafafff',
            overflow: 'hidden',
            boxShadow: 0,
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          onClick={() => handleImageClick(index)}
        >
          <Box
            component="img"
            src={src}
            alt={`Gallery Image ${index}`}
            sx={{
              width: '100%',
              height: { xs: '20vh', md: '250px' },
              aspectRatio: '1/1',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Box>
      ))}

      {/* Modal for desktop */}
      <Modal
  open={open}
  onClose={handleCloseModal}
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }}
>
  <Box
    sx={{
      width: 'auto',
      height: '85%',
      backgroundColor: 'white',
      borderRadius: 2,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
    }}
  >
    <Box sx={{ position: 'relative', width: '100%', height: '95%', overflow: 'hidden' }}>
      <Box
        component="img"
        src={selectedImage}
        alt="Selected"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      {/* Close Button */}
      <IconButton
        onClick={handleCloseModal}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          color: '#000',
          '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.4)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Caption */}
      {/* <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          color: '#fff',
          padding: 2,
          textAlign: 'center',
          borderRadius: '0 0 8px 8px',
        }}
      >
        <Typography variant="h5">{selectedTitle}</Typography>
        <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
          {selectedDesc}
        </Typography>
      </Box> */}
    </Box>

  {/* Fixed Prev Button */}
  <IconButton
    onClick={handlePrev}
    sx={{
      position: 'fixed',
      top: '50%',
      left: '3%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,0.7)',
      color: '#000',
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' },
      zIndex: 1500, // Make sure it's above everything
    }}
  >
    <ArrowBackIosNewIcon />
  </IconButton>

  {/* Fixed Next Button */}
  <IconButton
    onClick={handleNext}
    sx={{
      position: 'fixed',
      top: '50%',
      right: '3%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(255,255,255,0.7)',
      color: '#000',
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.5)' },
      zIndex: 1500,
    }}
  >
    <ArrowForwardIosIcon />
  </IconButton>


  </Box>


</Modal>


      {/* Drawer for mobile */}
      <Drawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        anchor="bottom"
        sx={{
          '.MuiDrawer-paper': {
            width: '100%',
            height: 'auto',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            padding: 2,
            backgroundColor: '#fff',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <IconButton
            onClick={handleCloseDrawer}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              borderRadius: 2,
              backgroundColor: 'rgba(255,255,255,0.7)',
              color: '#000',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.4)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            component="img"
            src={selectedImage}
            alt="Selected"
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: '60vh',
              objectFit: 'cover',
              borderRadius: 2,
            
            }}
          />

          {/* Prev and Next Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2, mb: 5 }}>
            <Button onClick={handlePrev} startIcon={<ArrowBackIosNewIcon />}>
              Prev
            </Button>
            <Button onClick={handleNext} endIcon={<ArrowForwardIosIcon />}>
              Next
            </Button>
          </Box>

          {/* <Typography variant="h5" sx={{ mt: 2 }}>
            {selectedTitle}
          </Typography>
          <Typography variant="body1" sx={{ mt: 0, textAlign: 'center' }}>
            {selectedDesc}
          </Typography> */}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Gallery;
