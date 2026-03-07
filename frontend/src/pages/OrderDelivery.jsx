import { Box, Button, Typography } from "@mui/material";
import DoorDashImg from "../images/DoorDash.png";
import UberEatsImg from "../images/UberEats.png";

export default function OrderDelivery() {
  const doorDashUrl =
    "https://doordash.com/store/mezquite-valley-street-tacos-and-more-raleigh-27916689/?utm_campaign=gpa&rwg_token=ACgRB3e62Ys-rHDIvtx7BuqjXXj9jw7AwGTcThQ6w8mhDSKfiEAdm6qtndq7E8XX0f9pN7t-Zu-tia6QzbHoI3_oif7T3SXPWw%3D%3D";

  const uberEatsUrl =
    "https://www.ubereats.com/store/mezquite-valley/MfuGVIiiUaCo5y2VXFHdXA?diningMode=PICKUP&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMjMwOCUyMEJhcmdhdGUlMjBEciUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMjBlYjk4YWYwLTAyODktOGY1Ny0wZWFiLTc4ZjE1MDQ4NDFkNSUyMiUyQyUyMnJlZmVyZW5jZVR5cGUlMjIlM0ElMjJ1YmVyX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMzUuNzY1Mjc0NiUyQyUyMmxvbmdpdHVkZSUyMiUzQS03OC43ODg1OTU4JTdE&utm_campaign=CM2508147-search-free-nonbrand-google-pas_e_all_acq_Global&utm_medium=search-free-nonbrand&utm_source=google-pas";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        px: 3,
        pt: '5vh',
        pb: '9vh',
        maxWidth: '100%',
        alignItems: "center",
      }}
    >


        <Typography
            sx={{
                fontWeight: "bold",
                fontSize: "2.0rem",
                mb: 2,
                textAlign: "center",
                fontFamily: "Roboto Slab",
            }}
            >
                Available on Your Favorite Delivery Apps
            </Typography>

      {/* DoorDash Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => window.open(doorDashUrl, "_blank")}
        sx={{
          textTransform: "none",
          backgroundColor: "#000000ff",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "bold",
          py: 1.5,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1.5,
          maxWidth: '400px',
          "&:hover": { backgroundColor: "#D62807" },
        }}
      >
        <Box
          component="img"
          src={DoorDashImg}
          alt="DoorDash"
          sx={{ height: 55, width: "auto" }}
        />
        Order on DoorDash
      </Button>

      {/* Uber Eats Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => window.open(uberEatsUrl, "_blank")}
        sx={{
          textTransform: "none",
          backgroundColor: "#000000ff",
          color: "#fff",
          fontSize: "1rem",
          fontWeight: "bold",
          py: 1.5,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: '400px',
          gap: 1.5,
          "&:hover": { backgroundColor: "#05A956" },
        }}
      >
        <Box
          component="img"
          src={UberEatsImg}
          alt="Uber Eats"
          sx={{ height: 55, width: "auto" }}
        />
        Order on Uber Eats
      </Button>
    </Box>
  );
}
