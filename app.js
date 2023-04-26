const express = require('express');
const app = express();
const morseCode = require('./morse-code');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/translate', (req, res) => {
  const { text, mode } = req.body;

  if (mode === 'toMorse') {
    res.send(translateToMorse(text));
  } else {
    res.send(translateFromMorse(text));
  }
});

const translateToMorse = (text) => {
  return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
};

const translateFromMorse = (morse) => {
  const reversedMorseCode = Object.entries(morseCode).reduce((acc, [char, code]) => {
    acc[code] = char;
    return acc;
  }, {});

  return morse.split(' ').map(code => reversedMorseCode[code] || '').join('');
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});