import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Container,
  InputAdornment
} from '@mui/material';

// Assuming USCities is imported and available like in the previous example
import USCities from '../data/OptimizedUSCities.json'; // Adjust the path as necessary

const countries = ['United States', 'Canada', 'Mexico']; // Add more countries if needed

const AddressForm = () => {
  // Get today's date and tomorrow's date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Format the dates as 'YYYY-MM-DD'
  const formattedToday = today.toISOString().split('T')[0];
  const formattedTomorrow = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phoneNumber: '',
    address: '',
    country: 'United States',
    zipCode: '',
    state: '',
    city: '',
    roomNumber: '',
    checkInDate: formattedToday, // Set default check-in date to today
    checkOutDate: formattedTomorrow, // Set default check-out date to tomorrow
    rate: '', // For the rate field
  });

  const [addressSuggestions, setAddressSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // No address suggestions on address input
    if (name === 'address') {
      setAddressSuggestions([]); // Clear address suggestions
    }
  };

  const handleZipCodeBlur = () => {
    const { zipCode } = formData;

    if (zipCode.length === 5) {
      // Look up ZIP code in USCities data
      const match = USCities.find((city) => city.zip_code.toString() === zipCode);
      if (match) {
        setFormData((prev) => ({
          ...prev,
          city: match.city,
          state: match.state,
        }));
      } else {
        setFormData((prev) => ({ ...prev, city: '', state: '' }));
      }
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    // Simulate autofilling from address suggestion
    setFormData({
      ...formData,
      address: suggestion,
      state: 'Mock State',
      city: 'Mock City',
      zipCode: '00000',
    });
    setAddressSuggestions([]);
  };

  const handleSearchGuest = () => {
    // Search guest logic
    console.log('Searching for guest with:', formData);
  };

  const handleCreateReservation = () => {
    // Create reservation logic
    console.log('Creating reservation with:', formData);
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
       <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '100%', height: '70vh', p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us Form
        </Typography>
        
        <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center' }}>
        Page Under Development
        </Typography>
        
        </Box>
    </Container>
  );
};

export default AddressForm;
