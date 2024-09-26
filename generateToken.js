require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_ACCRESS_SECRET = process.env.JWT_ACCRESS_SECRET;

if (!JWT_ACCRESS_SECRET) {
  console.error('JWT_ACCRESS_SECRET is not defined in the environment variables');
  process.exit(1);
}

console.log('Secret being used:', JWT_ACCRESS_SECRET);

const payload = {
  email: 'johndoe2@example.com',
  role: 'user'
};

const token = jwt.sign(payload, JWT_ACCRESS_SECRET, {
  expiresIn: '1h'
});

console.log('Generated Token:', token);

try {
  const decoded = jwt.verify(token, JWT_ACCRESS_SECRET);
  console.log('Token verified successfully');
  console.log('Decoded payload:', decoded);
} catch (error) {
  console.error('Token verification failed:', error.message);
}

console.log('\nUse this token in your Postman request in the Bearer Token field (without the "Bearer " prefix).');