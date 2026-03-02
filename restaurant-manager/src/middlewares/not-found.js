const notFound = (req, res) => {
  res.status(404).json({
    message: '404 - Route not found in Brasa 33 Restaurant Manager API'
  });
};

module.exports = notFound;
