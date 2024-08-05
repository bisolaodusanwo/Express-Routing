const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('The web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

app.use(checkWorkingHours);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/services.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/contact.html'));
});

app.listen(port, () => {
  console.log(Server running at http://localhost:${port});
});