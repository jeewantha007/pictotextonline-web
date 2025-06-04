const express = require('express');
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const { checkOcrUsage } = require('../middlewares/rateLimiter');

const router = express.Router();
const textract = new AWS.Textract();
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload', checkOcrUsage, (req, res) => {
  upload.single('image')(req, res, err => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Max 5 MB.' });
      }
      return res.status(500).json({ error: 'Upload error.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imageBytes = fs.readFileSync(req.file.path);
    fs.unlinkSync(req.file.path);

    textract.detectDocumentText({ Document: { Bytes: imageBytes } }, (err, data) => {
      if (err) return res.status(500).json({ error: 'Error processing document.' });

      const extractedText = data.Blocks
        .filter(b => b.BlockType === 'LINE')
        .map(b => b.Text)
        .join('\n');

      res.json({ text: extractedText });
    });
  });
});

module.exports = router;
