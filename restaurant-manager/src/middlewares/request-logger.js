const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  }
  next();
};

module.exports = requestLogger;
