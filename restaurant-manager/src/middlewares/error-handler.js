const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  if (process.env.NODE_ENV === 'production') {
    res.status(status).json({ message: 'Internal server error' });
  } else {
    res.status(status).json({ message: err.message || 'Internal server error', stack: err.stack });
  }
};

module.exports = errorHandler;
