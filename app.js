// Import the required modules
const express = require('express'); // Import the Express library
const path = require('path');       // Import the Path library for file paths

// Create an Express application
const app = express();
const port = 3000; // Define the port number for the server

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware function to check if the current time is within working hours
const checkWorkingHours = (req, res, next) => {
  const now = new Date(); // Get the current date and time
  const day = now.getDay(); // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
  const hour = now.getHours(); // Get the current hour of the day

  // Check if the current day and hour are within working hours (Monday to Friday, 9 AM to 5 PM)
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Allow the request to proceed
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 to 17).'); // Send a message if outside working hours
  }
};

// Use the working hours middleware for all routes
app.use(checkWorkingHours);

// Route to serve the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/home.html')); // Send the home.html file from the public/html directory
});

// Route to serve the services page
app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/services.html')); // Send the services.html file from the public/html directory
});

// Route to serve the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/contact.html')); // Send the contact.html file from the public/html directory
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); // Log a message when the server is running
});
