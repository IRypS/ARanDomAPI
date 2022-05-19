const handleHttpError = (res, error) => {
  console.log('error');
  res.status(500);
  res.send({ error: 'ERROR' });
};


/**
 * Manejar un error específico
 * @param {*} res 
 * @param {*} message 
 * @param {*} code 
 */
const handleErrorResponse = (res, message = 'Algo ocurrió', code = 401) => {
  console.log('Error', message);
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };