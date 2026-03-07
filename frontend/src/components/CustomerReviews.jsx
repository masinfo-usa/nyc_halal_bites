import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Star, StarBorder } from '@mui/icons-material';

const reviews = [
  {
    name: 'Mario Andres',
    date: 'Feb 3, 2025',
    rating: 5,
    text: "Mezquite valley street tacos never lets you down. I’ve been coming here for some time now and I’ve ordered tacos, quesabirria, churros, burritos, tortas, tamales, agua de Jamaica, tamarindo, piña. Everything has been good. I’ll keep coming back.",
  },
  {
    name: 'Avery Johnson',
    date: 'Jul 9, 2024',
    rating: 5,
    text: 'So good and so fresh! We decided to eat here after dropping off our U-Haul and I am so glad we did. I had the Torta de Asada and my husband had a burrito and were blown away. Super authentic Mexican and delicious.',
  },
  {
    name: 'Hannah An',
    date: 'May 13, 2024',
    rating: 5,
    text: "Amazing tacos! I've been here 2 times with my boyfriend and we eat good every time. Super sweet people running the truck. The sauces they have are sooooo delicious. Highly reccomend their Lengua tacos and aguas frescas. 10/10",
  },
  {
    name: 'Kyle Jones',
    date: 'Jan 31, 2024',
    rating: 5,
    text: "Hands down the best authentic Mexican food my family and I have had since moving from Colorado. We had the queso birria tacos. Highly recommend.",
  },
  {
    name: 'Amba Mo',
    date: 'Jun 7, 2023',
    rating: 5,
    text: "First time and its amazing!! Great portions, awesome flavors! Update: every time I’m on this side of town I stop. This is my favorite taco truck!!!",
  },
];

const CustomerReviews = () => {
  return (
    <Box sx={{ mt: 6, py: 6, maxWidth: '100%', mx: '5px' }}>
      <Typography variant="h4" textAlign="center" mb={2} color='#fff'>
        Google Reviews From Our Customers
      </Typography>

      <Box sx={{ position: 'relative', paddingTop: '0px'}}>
      <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 4000 }}
  loop
  pagination={{ clickable: true }}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  }}
>
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  boxShadow: 0,
                  textAlign: 'center',
                  minHeight: 250,
                  backgroundColor:'#000'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                  {Array.from({ length: 5 }, (_, i) =>
                    i < review.rating ? (
                      <Star key={i} sx={{color:'#ffee00ff'}} />
                    ) : (
                      <StarBorder key={i} color="disabled" />
                    )
                  )}
                </Box>
                <Typography variant="subtitle1" fontWeight="bold"  color="#fff">
                  {review.name}
                </Typography>
                {/* <Typography variant="caption" color="#fff">
                  {review.date}
                </Typography> */}
                <Typography variant="body1" mt={2} color="#fff">
                  “{review.text}”
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots Styling */}
        <style>
          {`
            .swiper-pagination {
              position: absolute;
              top: 0px;
              width: 100%;
              text-align: center;
              z-index: 10;
            }

            .swiper-pagination-bullet {
              background: #ccc;
              opacity: 1;
              margin: 0 4px !important;
              width: 10px;
              height: 10px;
            }

            .swiper-pagination-bullet-active {
              background: #1976d2;
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default CustomerReviews;
