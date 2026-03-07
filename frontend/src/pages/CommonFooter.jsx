import { Box, Typography, IconButton, Divider, Link, Container } from '@mui/material';
import { LocationOn, Email, Phone, Facebook, Language } from '@mui/icons-material';
import { FaInstagram, FaGoogle } from 'react-icons/fa';
import MezquiteLogo from "../images/MezquiteLogo - Full.png";

const CommonFooter = () => {
  return (
    <Box
      sx={{
        bgcolor: '#000',
        borderTop: "2px solid #00c20a",
        color: '#eee',
        py: 3,
        mt: 0,
      }}
    >
      <Container>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'column' }}
          justifyContent={{ xs: 'center', md: 'center' }}
          alignItems={{ xs: 'center', md: 'center' }}
          textAlign={{ xs: 'center', md: 'center' }}
          gap={2}
        >
          {/* Logo */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "center" },
              alignItems: "center",
            }}
            component="a"
            href="/"
          >
            <img
              src={MezquiteLogo}
              alt="Mezquite Logo"
              style={{ height: 120, width: "auto" }}
            />
          </Box>

          {/* Location */}
          <Box flex={1}>
            <Typography variant="h6" gutterBottom>
              Mezquite Valley Street Tacos and More
            </Typography>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "center" }}
              alignItems="center"
              gap={1}
              mb={0}
            >
              <LocationOn fontSize="small" />
              <Typography variant="body2">
                430 Buck Jones Rd, Raleigh, NC 27606
              </Typography>
            </Box>
          </Box>

          {/* Contact */}
          <Box flex={1}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "center" }}
              alignItems="center"
              gap={1}
            >
              <Phone fontSize="small" />
              <a
                href="tel:+19194806649"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <Typography variant="body2">
                  +1 (919) 480-6649
                </Typography>
              </a>
            </Box>
          </Box>

          {/* Social Icons */}
          <Box flex={1}>
            <Box
              display="flex"
              justifyContent={{ xs: "center", md: "center" }}
              alignItems="center"
              gap={2}
              
            >

              <IconButton
                color="inherit"
                href="https://www.facebook.com/Mezquitevalleysouthoftheborder/"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{ color: '#fff' }}
                href="https://www.instagram.com/mezquitevalley/?hl=en"
                target="_blank"
              >
                <FaInstagram size={24} />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.google.com/search?sca_esv=b2b0647d6414b5de&hl=en&sxsrf=AE3TifPSl7IPxKQSxx7QTHfpk1WNziyWUQ:1762078627431&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_5Hh-q5HrfZdxBkYGJal4eAnauGuwCm9jMZgeX55Wh9-o97RMS4og_VV5iUmkIt3hhlIINdI66_UcQTmuCoPPrb2rOEKeUy51hP_Tkl5p1quuDS0hPKvmW45xDe0vNysTHAGW0%3D&q=Mezquite+Valley+street+tacos+and+more+Reviews&sa=X&ved=2ahUKEwj86p21ntOQAxUwm2oFHY-SPasQ0bkNegQIJBAD&cshid=1762078648041922&biw=2133&bih=1021&dpr=0.9"
                target="_blank"
              >
                <FaGoogle size={24} />
              </IconButton>
            </Box>


            <Box sx={{ textAlign: "center", py: 2, mt: 2, mb: 8, borderTop: '1px solid #eee'}}>
              <Typography variant="body2" color="#fff">
                Website Developed by{" "}
                <Link
                  
                  href="#"  // <-- update later
                  // target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="lightgreen"
                  sx={{ fontWeight: 600 }}
                >
                  Masinfo Systems
                </Link>
              </Typography>
            </Box>
          </Box>








        </Box>
      </Container>
    </Box>
  );
};


export default CommonFooter;