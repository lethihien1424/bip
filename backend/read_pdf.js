const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('g:/Nhap/bao_cao_de04.pdf');
pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => console.error(err));
