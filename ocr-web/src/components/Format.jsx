import React from 'react';

const Format = {
  // Enhanced text formatting function
  formatExtractedText: (rawText) => {
    if (!rawText) return '';
    
    let formattedText = rawText
      // Remove excessive whitespace and normalize line breaks
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]+/g, ' ')
      .trim();

    // Split into lines for processing
    let lines = formattedText.split('\n');
    
    // Process each line
    lines = lines.map(line => {
      line = line.trim();
      
      // Skip empty lines
      if (!line) return line;
      
      // Fix common OCR spacing issues
      line = line
        // Fix spaces around punctuation
        .replace(/\s+([,.!?;:])/g, '$1')
        .replace(/([,.!?;:])\s*/g, '$1 ')
        .replace(/\s+/g, ' ')
        // Fix quotes and parentheses
        .replace(/\s*"\s*/g, '"')
        .replace(/\s*'\s*/g, "'")
        .replace(/\s*\(\s*/g, ' (')
        .replace(/\s*\)\s*/g, ') ')
        // Fix numbers and units
        .replace(/(\d)\s+([A-Za-z%$])/g, '$1$2')
        .replace(/([A-Za-z])\s+(\d)/g, '$1 $2')
        // Fix common word separations
        .replace(/\b([A-Z])\s+([a-z])/g, '$1$2')
        .trim();
      
      return line;
    });
    
    // Rejoin and clean up
    formattedText = lines.join('\n')
      .replace(/\n\s*\n/g, '\n\n')
      .replace(/^\s+|\s+$/g, '');
    
    // Additional formatting for better readability
    formattedText = formattedText
      // Ensure proper spacing after periods
      .replace(/\.([A-Z])/g, '. $1')
      // Fix common OCR mistakes
      .replace(/\bl\b/g, 'I') // Lowercase L to uppercase I when standalone
      .replace(/\b0\b/g, 'O') // Zero to O when standalone (context dependent)
      .replace(/(\w)1(\w)/g, '$1l$2') // 1 to l between letters
      .replace(/rn/g, 'm') // Common OCR mistake
      .replace(/vv/g, 'w') // Another common mistake
      // Ensure proper capitalization after periods
      .replace(/\.\s*([a-z])/g, (match, letter) => '. ' + letter.toUpperCase());
    
    return formattedText;
  },

  // Grammar check function
  checkGrammar: async (text) => {
    if (!text.trim()) {
      throw new Error('No text to check!');
    }

    console.log('Checking grammar...');
    
    const response = await fetch('https://api.pictotextonline.com/grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.matches && data.matches.length > 0) {
      // Format the errors for display with fix functionality
      const errors = data.matches.map((match, index) => ({
        id: index,
        message: match.message,
        context: match.context.text,
        offset: match.offset,
        length: match.length,
        replacements: match.replacements ? match.replacements.map(r => r.value) : [],
        rule: match.rule ? match.rule.description : 'Grammar rule',
        category: match.rule && match.rule.category ? match.rule.category.name : 'General',
        originalText: text.substring(match.offset, match.offset + match.length),
        applied: false
      }));

      return {
        hasErrors: true,
        errors: errors,
        totalErrors: errors.length,
        originalText: text
      };
    } else {
      return {
        hasErrors: false,
        message: 'Great! No grammar errors found in your text.'
      };
    }
  },

  // OCR processing function
  processOCR: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.pictotextonline.com/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'OCR failed');
    }

    if (!data.text) {
      throw new Error('OCR processing failed');
    }

    return data;
  }
};

export default Format;