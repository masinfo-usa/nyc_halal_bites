import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CategoryCard({ image, name, description }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "row", md: "column" }, // horizontal on small, vertical on medium+
        borderBottom: { xs: "1px solid #dadadaff", md: "0px solid #b3b3b3ff" },
        alignItems: { xs: "flex-start", md: "center" },
        borderRadius: "0px",
        boxShadow: 0,
        overflow: "hidden",
        position: "relative",
        p: 1,
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.0s ease",
        "&:hover": {
        //  transform: "scale(1.02)",
          boxShadow: 0,
        },
      }}
      onClick={() => navigate(`/products/${encodeURIComponent(name)}`)}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        sx={{
          width: { xs: "20%", md: "100%" },  // smaller width on mobile, full on desktop
          height: { xs: "auto", md: 200 },
          objectFit: "cover",
          borderRadius: "6px",
          mr: { xs: 2, md: 0 }, // add margin-right on small
          mb: { xs: 2, md: 0 }, // add margin-right on small
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          align="left"
          sx={{
            mt: { xs: 0, md: 1 },
            fontSize: '1.2rem',
            fontWeight: "bold",
            color: "green",
            width: "100%",
          }}
        >
          {name}
        </Typography>

        <Typography
          variant="body2"
          align="left"
          sx={{
            mt: { xs: 0.5, md: 0.5 },
            color: "text.secondary",
            width: "100%",
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
