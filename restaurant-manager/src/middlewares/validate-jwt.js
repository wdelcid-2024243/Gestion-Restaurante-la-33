const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization') || '';

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'No token provided or bad format, expected "Bearer <token>"'
    });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET no definido en el entorno');
    return res.status(500).json({ message: 'Server configuration error' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT validation error', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = validateJWT;
