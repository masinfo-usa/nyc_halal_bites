import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    category: '',
    name: '',
    image: '',
    price: '',
    priceBeforeDiscount: '',
    pricePerQuantity: '',
    description: '',
    aisleNum: '',
    packingType: '',
    packingTimeInMinutes: '',
    measuringUnit: '',
    nutritionPer100Gm: '',
    availableStock: '',
    maxPerOrder: '',
    packingOptions: '',
    orderedQuantity: '',
    ratings: '',
    customerComments: '',
  });

  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    setToast({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });

    if (success) {
      setNewProduct({
        category: '',
        name: '',
        image: '',
        price: '',
        priceBeforeDiscount: '',
        pricePerQuantity: '',
        description: '',
        aisleNum: '',
        packingType: '',
        packingTimeInMinutes: '',
        measuringUnit: '',
        nutritionPer100Gm: '',
        availableStock: '',
        maxPerOrder: '',
        packingOptions: '',
        orderedQuantity: '',
        ratings: '',
        customerComments: '',
      });
    }
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" gap={3} my={4}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Create New Product
        </Typography>

        <Box
          width="100%"
          bgcolor={theme.palette.background.paper}
          p={3}
          borderRadius={2}
          boxShadow={3}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            />
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          
            <TextField
              label="Packing Time (Minutes)"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.packingTimeInMinutes}
              onChange={(e) => setNewProduct({ ...newProduct, packingTimeInMinutes: e.target.value })}
            />
            
            <TextField
              label="Max Per Order"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.maxPerOrder}
              onChange={(e) => setNewProduct({ ...newProduct, maxPerOrder: e.target.value })}
            />
            <TextField
              label="Options (comma-separated)"
              variant="outlined"
              fullWidth
              value={newProduct.packingOptions}
              onChange={(e) =>
                setNewProduct({ ...newProduct, packingOptions: e.target.value.split(',') })
              }
            />
            
            <Button variant="contained" color="primary" fullWidth onClick={handleAddProduct}>
              Add Product
            </Button>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={handleToastClose}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreatePage;
