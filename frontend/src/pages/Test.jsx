import React, { useState, useEffect } from 'react';

// If the file is in 'src/data'
import USCities from '../datafiles/OptimizedUSCities.json'; // Adjust the path as necessary

const AddressForm = () => {
  const [formData, setFormData] = useState({
    zipCode: '',
    state: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // Add this line for debugging
    setFormData({ ...formData, [name]: value });
  
    if (name === 'zipCode' && value.length === 5) {
      console.log('Searching for ZIP code: ', value); // Add this for debugging
      const match = USCities.find((city) => city.zip_code.toString() === value);
      if (match) {
        console.log('Found match: ', match); // Check what match contains
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
  

  return (
    <div>
      <label>
        ZIP Code:
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleInputChange}
          maxLength={5} // ZIP codes are 5 digits
        />
      </label>
      <br />
      <label>
        City:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          readOnly
        />
      </label>
      <br />
      <label>
        State:
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          readOnly
        />
      </label>
    </div>
  );
};

export default AddressForm;
