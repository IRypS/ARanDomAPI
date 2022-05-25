/**
 * REQUIRES
 */

require('dotenv').config();
//! CORREGIR UPDATE USERS
const express = require('express');
const cors = require('cors');
const app = express();
const dbConnect = require('./config/mongo');

/**
 * CONFIGURATIONS
 */
app.use(cors());
app.use(express.json()); //? Reemplaza al body parser
//app.use(express.static("storage"));

const port = process.env.PORT || 3000;

/**
 * ROUTES
 */
app.use('/api', require('./routes'));


/**
 * LISTEN PORT
 */
app.listen(port, () => {
  console.log(`Servidor funcionando en el puerto ${port} \n${process.env.URL_PUBLIC}`)
});

/**
 * DB CONNECTION
 */
dbConnect();