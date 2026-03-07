import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const StaffLogin = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/staff/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/staff/login", { pin });
      sessionStorage.setItem("staffToken", res.data.token);
      navigate(from, { replace: true });
    } catch {
      setError("Invalid PIN. Try again.");
      setPin("");
      setTimeout(() => inputRef.current?.focus(), 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#000" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          backgroundColor: "#1a1a1a",
          p: 4,
          borderRadius: 2,
          width: 280,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="#fff" fontWeight="bold" textAlign="center">
          Staff Access
        </Typography>

        <TextField
          type="password"
          label="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          autoFocus
          inputRef={inputRef}
          inputProps={{ inputMode: "numeric" }}
          sx={{
            "& .MuiInputBase-input": { color: "#fff" },
            "& .MuiInputLabel-root": { color: "#aaa" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
          }}
        />

        {error && (
          <Typography color="error" fontSize={13} textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !pin}
          fullWidth
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Enter"}
        </Button>
      </Box>
    </Box>
  );
};

export default StaffLogin;
