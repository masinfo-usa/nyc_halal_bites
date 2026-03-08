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
  name: "Platters",
  image: category1,
  description: "Classic New York–style halal platters served over seasoned basmati rice with fresh salad and our famous house white sauce.",
},
{
  name: "Gyros",
  image: category2,
  description: "Warm pita wraps filled with juicy halal chicken, lamb, or crispy falafel, topped with fresh vegetables and creamy white sauce.",
},
{
  name: "Hero Sandwiches",
  image: category3,
  description: "Loaded 12-inch hero sandwiches packed with grilled meats, melted cheese, and flavorful sauces, served with crispy fries.",
},
{
  name: "Fresh Salads",
  image: category4,
  description: "Healthy and refreshing salads made with fresh vegetables and topped with grilled halal chicken or lamb.",
},
{
  name: "Sides",
  image: category7,
  description: "Perfect extras to complement your meal, including crispy fries and other tasty add-ons.",
},
{
  name: "Drinks",
  image: category8,
  description: "Refreshing drinks including a variety of Arizona flavors and cold beverages to pair with your meal.",
}

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
