/**
 * REQUIRES
 */
const express = require('express');
const { route } = require('express/lib/application');
const fs = require('fs');
const router = express.Router();

const pathRouter = `${__dirname}`;
//console.log(pathRouter);

const removeExtension = (fileName) => {
  return fileName.split('.').shift();
};

/**
 * INDEX ROUTES
 */
fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ['index'].includes(fileWithOutExt);
  if(!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    console.log('CARGANDO RUTA --> ', fileWithOutExt);
  }
});

module.exports = router;