const usageLimits = {
  ocr: 10,
  grammar: 10,
};

const usageData = {}; // { ip: { ocrCount, grammarCount, lastReset } }

function resetUsageIfNeeded(ip) {
  const now = new Date();
  if (!usageData[ip]) {
    usageData[ip] = { ocrCount: 0, grammarCount: 0, lastReset: now };
  } else {
    const last = usageData[ip].lastReset;
    if (
      now.getUTCDate() !== last.getUTCDate() ||
      now.getUTCMonth() !== last.getUTCMonth() ||
      now.getUTCFullYear() !== last.getUTCFullYear()
    ) {
      usageData[ip].ocrCount = 0;
      usageData[ip].grammarCount = 0;
      usageData[ip].lastReset = now;
    }
  }
}

function checkOcrUsage(req, res, next) {
  const ip = req.ip;
  resetUsageIfNeeded(ip);
  if (usageData[ip].ocrCount >= usageLimits.ocr) {
    return res.status(429).json({ error: `OCR limit reached (${usageLimits.ocr}/day).` });
  }
  usageData[ip].ocrCount++;
  next();
}

function checkGrammarUsage(req, res, next) {
  const ip = req.ip;
  resetUsageIfNeeded(ip);
  if (usageData[ip].grammarCount >= usageLimits.grammar) {
    return res.status(429).json({ error: `Grammar limit reached (${usageLimits.grammar}/day).` });
  }
  usageData[ip].grammarCount++;
  next();
}

module.exports = {
  checkOcrUsage,
  checkGrammarUsage,
};
