const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { v1 } = require('uuid');
const expressHttpContext = require('express-http-context');

/* Inicializando express */
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Configuración del CORS */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
  );
  res.header('Access-Control-Methods', 'GET', 'POST', 'OPTIONS', 'PATCH');
  res.header('Allow', 'GET', 'POST', 'OPTIONS', 'PATCH');

  next();
});

app.use(cors());

/* Capturando url's inexistentes */
app.use((req, res) => {
  log.warn('Solicitud a endpoint incorrecto o inexistente');
  res.status(502).json({
    code: 309,
    message: 'Endpoint incorrecto o inexistente',
    result: [],
  });
});

module.exports = app;
