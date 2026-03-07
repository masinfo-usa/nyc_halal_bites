import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { rgba } from "framer-motion";

const CustomAlert = ({ open, title, message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ backgroundColor: "rgba(1, 1, 1, 0.25)" }}>
      <DialogTitle sx={{backgroundColor: '#f08a46', color: 'primary.contrastText'}}>{title}</DialogTitle>
      <DialogContent sx={{mt: 2}}>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions sx={{ alignSelf: 'center', pb: 3 }}>
        <Button onClick={onClose} sx={{ minWidth:'100px', backgroundColor: '#f08a46', color:'#fff' }}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomAlert;
