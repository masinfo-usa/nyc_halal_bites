import fs from 'fs/promises'; // Use fs/promises for modern async handling

// Define the function to process the file
const optimizeZipCodes = async () => {
  try {
    // Read the original JSON file
    const data = await fs.readFile('./USCities.json', 'utf8');

    // Parse the JSON
    const jsonData = JSON.parse(data);

    // Extract only the necessary fields
    const optimizedData = jsonData.map(({ zip_code, city, state }) => ({
      zip_code,
      city,
      state,
    }));

    // Save the optimized JSON
    await fs.writeFile(
      './OptimizedUSCities.json',
      JSON.stringify(optimizedData, null, 2), // Pretty-print the JSON
      'utf8'
    );

    console.log('Optimized JSON saved as OptimizedUSCities.json');
  } catch (error) {
    console.error('Error processing file:', error);
  }
};

// Call the function
optimizeZipCodes();
