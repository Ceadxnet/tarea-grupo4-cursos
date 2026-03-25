/**
 * Evita try/catch repetido en controladores async: errores van al manejador global.
 */
function asyncHandler(fn) {
  return function asyncHandlerWrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;
