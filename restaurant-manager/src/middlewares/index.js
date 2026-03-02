const validateJWT = require('./validate-jwt');
const hasRole = require('./has-role');
const validateFields = require('./validate-fields');
const errorHandler = require('./error-handler');
const notFound = require('./not-found');
const requestLogger = require('./request-logger');

module.exports = {
  validateJWT,
  hasRole,
  validateFields,
  errorHandler,
  notFound,
  requestLogger
};
