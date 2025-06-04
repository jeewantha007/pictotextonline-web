const express = require('express');
const axios = require('axios');
const { checkGrammarUsage } = require('../middlewares/rateLimiter');

const router = express.Router();

router.post('/grammar', checkGrammarUsage, async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No text provided.' });

  try {
    const response = await axios.post(
      process.env.LANGUAGETOOL_API_URL,
      null,
      {
        params: { text, language: 'en-US' },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to check grammar.' });
  }
});

module.exports = router;
