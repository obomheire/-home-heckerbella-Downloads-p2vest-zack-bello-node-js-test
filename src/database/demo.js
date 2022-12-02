// Use path.join
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, '../../.env');

console.log(filePath);
