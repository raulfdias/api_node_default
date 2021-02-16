const path = require('path');

const { app } = require(path.resolve('src', 'config', 'app'));

const server = require('../config/server');

const port = app.server_port || 3000;

server.listen(port, () => {
    console.log(`Server ON: ${port}...`);
});
