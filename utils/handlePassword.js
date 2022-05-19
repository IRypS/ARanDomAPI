const bcrypt = require('bcryptjs');

/**
 * Encripta una contraseña
 * @param {*} textPlain 
 * @returns 
 */
const encrypt = async (textPlain) => {
  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
};


/**
 * Compara una contraseña en texto plano con una contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 * @returns 
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };