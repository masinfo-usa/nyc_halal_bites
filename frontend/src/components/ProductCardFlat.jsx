import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Alert,
  TextField
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useProductStore } from '../store/product';

const ProductCardFlat = ({ product }) => {
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const collapseTimeout = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    products,
    setSortedProducts,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    cartItems,
    updateProduct,
    deleteProduct,
    setSelectedProduct,
    setProductSource,
  } = useProductStore();
const itemsInCart = cartItems.filter((item) => item._id === product._id);
const totalQuantity = itemsInCart.reduce((sum, item) => sum + item.quantity, 0);

product.quantity = totalQuantity;


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    setIsModalOpen(false);
    setToast({
      open: true,
      message: success ? 'Product updated successfully!' : message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    setToast({
      open: true,
      message,
      severity: success ? 'success' : 'error',
    });
  };

  const handleExpand = () => {
      setSelectedProduct(product);
      setProductSource("menu");
    // if(product.requiredOptions){
    //   setSelectedProduct(product);
    //   setProductSource("menu");
    // }
    // else if(product.quantity > 0){
    //   handleAddToCart();
    // }
    // else{
    //   setExpanded(true);
    //   if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    //   collapseTimeout.current = setTimeout(() => setExpanded(false), 2000);
    // }

  };

  const handleAddToCart = () => {

    if(product.requiredOptions){
      setSelectedProduct(product);
      setProductSource("menu");
    }
    else{
      addOneToCart(product);
      setToast({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
    }
  };

  const handleRemoveFromCart = () => {
    if (product.quantity > 1) {
      removeOneFromCart(product._id);
      setToast({ open: true, message: `One ${product.name} removed from cart.`, severity: 'info' });
    } else {
      deleteFromCart(product);
      setToast({ open: true, message: `${product.name} removed from cart.`, severity: 'info' });
    }
    handleExpand();
  };

  const handleToastClose = () => setToast({ ...toast, open: false });

  useEffect(() => {
    return () => {
      if (collapseTimeout.current) clearTimeout(collapseTimeout.current);
    };
  }, []);

  return (
    <>
      {/* Flat Product Card */}
      <Box
        key={product._id}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 2,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#fff',
          p: 2,
          mb: 1,
          boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
        onClick={() => {
          setSortedProducts([...products].sort(() => Math.random() - 0.5));
          setSelectedProduct(product);
          setProductSource("menu");
        }}
      >
        {/* Left side - text */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, pr: 2 }}>
          <Typography
            variant="h6"
            color="#000"
            sx={{ fontSize: 'clamp(0.95rem, 4vw, 1.05rem)', fontWeight: 600 }}
          >
            {product.name}
          </Typography>

          {product.description && (
          <Typography
            variant="body2"
            color="#999"
            sx={{
              mt: 0.3,
              fontSize: 'clamp(0.8rem, 3.5vw, 0.95rem)',
              lineHeight: 1.3,
            }}
          >
            {product.description.length > 75
              ? `${product.description.substring(0, 75)}...`
              : product.description}
          </Typography>
        )}


          <Typography
            variant="body1"
            color="#333"
            sx={{
              mt: 0.5,
              fontSize: 'clamp(0.9rem, 4vw, 1.05rem)',
              fontWeight: 'bold',
            }}
          >
            ${product.price}
          </Typography>
        </Box>

        {/* Right side - image (if exists) */}
        {product.image && (
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: 110,
              height: 110,
              objectFit: 'cover',
              borderRadius: 2,
            }}
            onClick={(e) => {
           
            }}
          />
        )}

        {/* Floating Add/Remove Cart */}
       { false && (<Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'space-between' : 'center',
            backgroundColor: 'lightgreen',
            color: 'black',
            borderRadius: 5,
            border: '3px solid black',
            padding: expanded ? '0 5px' : 0,
            width: expanded ? 'calc(40%)' : 'auto',
            height: 40,
            minWidth: 40,
            boxShadow: '-5px 5px 10px rgba(0, 0, 0, 0.20)',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {expanded ? (
            <>
              <IconButton
                size="small"
                sx={{ color: 'black' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFromCart();
                }}
              >
                {product.quantity === 1 ? <Delete /> : <Remove />}
              </IconButton>
              <Typography sx={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>
                {product.quantity}
              </Typography>
              <IconButton
                size="small"
                sx={{ color: 'black' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                <Add />
              </IconButton>
            </>
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                { product.quantity === 0 ? handleAddToCart() : handleExpand(); }
              }}
              sx={{
                minWidth: 0,
                color: 'black',
                fontSize: 17,
                fontWeight: 'bold',
                textTransform: 'none'
              }}
            >
              {product.quantity === 0 ? '+Add' : product.quantity}
            </Button>
          )}
        </Box>        )}
      </Box>

      {/* Toast Notification */}
      {/* <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={handleToastClose}>
          {toast.message}
        </Alert>
      </Snackbar> */}

      {/* Update Product Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} sx={{ m: 3 }}>
            <TextField
              label="Product Category"
              value={updatedProduct.category}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, category: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Product Name"
              value={updatedProduct.name}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, price: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Image URL"
              value={updatedProduct.image}
              onChange={(e) =>
                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
              }
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ m: '20px', justifyContent: 'space-evenly' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            sx={{
              backgroundColor: 'lightgreen',
              color: '#000',
              fontWeight: 'bold',
              border: '1px solid #000',
              boxShadow: 'none',
            }}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            sx={{
              color: '#000',
              fontWeight: 'bold',
              border: '1px solid #000',
              boxShadow: 'none',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCardFlat;
