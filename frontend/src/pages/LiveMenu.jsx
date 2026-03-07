import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Card, CardContent } from "@mui/material";

export default function LiveMenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await axios.get("http://localhost:5000/api/menu");
        setMenu(res.data.menu);
      } catch (err) {
        console.error("Error loading menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  if (loading) {
    return <Typography>Loading menu...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography
        sx={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          textAlign: "center",
          mb: 3
        }}
      >
        Live Menu
      </Typography>

      {menu.map(item => (
        <Card
          key={item.id}
          sx={{ mb: 2, p: 2, borderRadius: "16px", background: "#fafafa" }}
        >
          <CardContent>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 600 }}>
              {item.name}
            </Typography>

            {item.description && (
              <Typography sx={{ color: "#666", mb: 1 }}>
                {item.description}
              </Typography>
            )}

            {item.variations.map(v => (
              <Typography key={v.id} sx={{ fontSize: "1rem", mt: 0.5 }}>
                {v.name}: ${v.price}
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
