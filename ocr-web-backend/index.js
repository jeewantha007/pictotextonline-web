require('dotenv').config();
const express = require('express');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express(); // ✅ Initialize app first
const port = 3000;

// ✅ JSON body parser — must be after `app` is defined
app.use(express.json());

// Middleware
app.use(cors({
  origin: [
    'https://pictotextonline.com',
    'https://www.pictotextonline.com',
    'http://pictotextonline.com',
    'http://www.pictotextonline.com'
  ]
}));


// AWS config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Routes
const ocrRoute = require('./routes/ocr');
const grammarRoute = require('./routes/grammar');

app.use('/', ocrRoute);
app.use('/', grammarRoute);

app.listen(port, () => {
  console.log(`Server running at http://pictotextonline.com:${port}`);
});
