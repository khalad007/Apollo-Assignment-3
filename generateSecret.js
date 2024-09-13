const crypto = require('crypto');

const secretToken = crypto.randomBytes(64).toString('hex');
console.log(secretToken);