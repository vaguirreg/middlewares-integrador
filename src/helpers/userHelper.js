const { fstat } = require('fs');
const path = require('path');
const fs = require('fs');

const pathFile = path.resolve(__dirname, '/../database/users.json');

module.exports = {
    leerJson: () => {
        return JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
    }
}