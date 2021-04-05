const fs = require('fs'),
    path = require('path'),
    basename = path.basename(__filename);

const files = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const f = require(path.join(__dirname, file));
    files[file.slice(0, (file.length - 3))] = f;
});

module.exports = files;
