import React from "react";
import { Container, Box, Typography } from "@mui/material";
import CategoryCard from "../components/CategoryCard";

// Import category images (assuming src/images/categories/category1.png etc.)
import category1 from "../images/categories/c1.jpg";
import category2 from "../images/categories/c2.jpg";
import category3 from "../images/categories/c3.jpg";
import category4 from "../images/categories/c4.jpg";
import category5 from "../images/categories/c5.jpg";
import category6 from "../images/categories/c6.jpg";
import category7 from "../images/categories/c7.jpg";
import category8 from "../images/categories/c8.jpg";
import category9 from "../images/categories/c9.jpg";
import category10 from "../images/categories/c10.jpg";
import category11 from "../images/categories/c11.jpg";

export default function MainMenu() {
  const aspectRatio = 1.2; // tweak for spacing feel

const categories = [
  {
    name: "Typical Dishes",
    image: category1,
    description: "Authentic Mexican plates packed with tradition and bold flavors.",
  },
  {
    name: "Side Orders",
    image: category2,
    description: "The perfect add-ons to complete your meal — crispy, cheesy, or spicy.",
  },
  {
    name: "Tacos",
    image: category3,
    description: "Soft or crunchy, each taco is a flavor-packed bite of Mexico.",
  },
  {
    name: "Burritos",
    image: category4,
    description: "Rolled up goodness stuffed with your favorite fillings and sauces.",
  },
  {
    name: "Breakfast Burritos",
    image: category5,
    description: "Start your morning with fresh eggs, meats, and Mexican spice in every bite.",
  },
  {
    name: "Quesadillas",
    image: category6,
    description: "Golden grilled tortillas with melty cheese and delicious fillings inside.",
  },
  {
    name: "Signature Burritos",
    image: category7,
    description: "Our one-of-a-kind burritos — loaded, saucy, and bursting with personality.",
  },
  {
    name: "Chicken Lovers",
    image: category8,
    description: "Tender, juicy chicken served up in our fan-favorite styles.",
  },
  {
    name: "Tortas Sandwiches",
    image: category9,
    description: "Freshly baked bread stacked with meats, veggies, and Mexican flavor.",
  },
  {
    name: "Drinks",
    image: category10,
    description: "Refreshing aguas frescas and beverages to cool you down.",
  },
  // {
  //   name: "Sauces",
  //   image: category11,
  //   description: "A variety of salsas with fresh ingredients and bold flavors.",
  // },

];


  return (
    <Container maxWidth="100%"  sx={{
        mt: 0,
        mb: 3,
        backgroundColor: '',
        width: {
        xs: "100%",
        sm: "100%", 
        md: "90%", 
        lg: "75%", 
        xl: "75%"
        },
        p:0,
         textAlign: "center", // centers all inline text like Typography
        }}>
        <Typography
          variant="h4"
          fontSize={`30px`}
          fontWeight="semibold"
          color="black"
          mt={3}
          mb={2}
          sx={{
            alignSelf: 'center'
        }}
        >
          Mezquite Valley Menu 
        </Typography>

        <Typography
          variant="subtitle1"
          fontSize={`20px`}
          fontWeight="normal"
          alignSelf="center"
          color="#9e9e9eff"
          mt={0}
          mb={2}
        >
            Choose From Your Favourites       
        </Typography>

        {/* <Typography
          variant="subtitle1"
          fontSize={`15px`}
          fontWeight="normal"
          alignSelf="center"
          color="#9e9e9eff"
          mt={0}
          mb={2}
        >
          
            Online ordering hours: 11:00 AM - 10:30 PM
        </Typography> */}


        <Box
        sx={{
            display: "grid",
            gridTemplateColumns: {
            xs: `repeat(1, 1fr)`,
            sm: `repeat(1, 1fr)`,
            md: `repeat(3, 1fr)`,
            lg: `repeat(4, 1fr)`,
            xl: `repeat(4, 1fr)`,
            },
            columnGap: `${aspectRatio * 3}vh`,
            rowGap: `${aspectRatio * 1}vh`,
        }}
        >
        {categories.map((cat, index) => (
            <CategoryCard key={index} image={cat.image} name={cat.name} description={cat.description} />
        ))}
        </Box>
    </Container>
  );
}
