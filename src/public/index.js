const server = require('../config/server'),
    path = require('path');

require('dotenv').config({ path: path.resolve('src', '.env') });

const port = process.env.APP_SERVER_PORT || 3000;

server.listen(port, () => {
    console.log(`Server ON: ${port}...`);
});
