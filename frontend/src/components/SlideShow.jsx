import React, { useEffect, useState, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const imageImports = import.meta.glob(
  ['../images/foods/*.png', '../images/foods/*.jpg', '../images/foods/*.jpeg'],
  { eager: true }
);
const images = Object.values(imageImports).map((mod) => mod.default);

const captions = [
  { title: 'Tacos', desc: 'A traditional Mexican dish that is a corn or wheat tortilla, usually folded, and filled with seasoned meats, vegetables, and other fillings' },
  { title: 'Food 2', desc: 'This is description for food 2.' },
  { title: 'Food 3', desc: 'This is description for food 3.' },
  { title: 'Fried Fish', desc: 'A fish fry is a meal made of comfort food, and there is no food more comforting than bread. A fish fry is typically served with butter and dinner rolls.' },
  { title: 'Food 5', desc: 'This is description for food 5.' },
  { title: 'Food 6', desc: 'This is description for food 6.' },
  { title: 'Food 7', desc: 'This is description for food 6.' },
  { title: 'Food 8', desc: 'This is description for food 6.' },
  { title: 'Food 9', desc: 'This is description for food 6.' },
  { title: 'Food 10', desc: 'This is description for food 6.' },
  { title: 'Food 11', desc: 'This is description for food 6.' },
  { title: 'Food 12', desc: 'This is description for food 6.' },
  { title: 'Food 13', desc: 'This is description for food 6.' },
  { title: 'Food 14', desc: 'This is description for food 6.' },
  { title: 'Food 15', desc: 'This is description for food 6.' },
  { title: 'Food 16', desc: 'This is description for food 6.' },
  { title: 'Food 17', desc: 'This is description for food 6.' },
  { title: 'Food 18', desc: 'This is description for food 6.' },
  // Add more if needed
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);
  const pauseRef = useRef(null);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const pauseAutoSlide = () => {
    clearInterval(pauseRef.current);
    pauseRef.current = setInterval(() => {
      nextSlide();
    }, 7000); // Resume after 4s
  };

  useEffect(() => {
    pauseRef.current = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(pauseRef.current);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '40vh', sm: '40vh', md: '50vh', lg:'70vh' },
        overflow: 'hidden',
        border: '0px solid lightgreen',
        borderRadius: { xs: '0', md: 5 },
      }}
    >
      {images.map((src, index) => (
        <Box
          key={index}
          component="img"
          src={src}
          alt={`Slide ${index}`}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out, transform 4s ease-in-out',
            transform:
              index === current ? 'scale(1.0) translateX(0%)' : 'scale(1.00)',
          }}
        />
      ))}






      {/* <IconButton
        onClick={() => {
          prevSlide();
          pauseAutoSlide();
        }}
        sx={{
          position: 'absolute',
          left: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#000',
          backgroundColor: 'rgba(255,255,255,0.6)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
        }}
      >
        <ArrowBackIosNew />
      </IconButton>

      <IconButton
        onClick={() => {
          nextSlide();
          pauseAutoSlide();
        }}
        sx={{
          position: 'absolute',
          right: 10,
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#000',
          backgroundColor: 'rgba(255,255,255,0.6)',
          '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
        }}
      >
        <ArrowForwardIos />
      </IconButton>  */}
    </Box>
  );
};

export default SlideShow;
