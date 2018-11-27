const express = require('express');
const router = express.Router();
const generatePassword = require('password-generator');
const empleadosController = require('../controllers/empleados');

function loggedInEmpleado(req, res, next) {
  if (!req.session.id_empleado && (req.session.auth !== req.session.id)) {
    return res.status(401).send({ success: false, message: 'Usuario no autenticado' });
  }

  next();
}

router.get('/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

router.post('/empleados/registro', function(req, res, next) {
  empleadosController.signup(req, res);
});

router.post('/empleados/login', function(req, res, next) {
  empleadosController.login(req, res);
});

router.post('/empleados/logout', loggedInEmpleado, function(req, res, next) {
  empleadosController.logout(req, res);
});

router.get('/empleados/me', loggedInEmpleado, function(req, res, next) {
  empleadosController.getEmpleado(req, res);
});

module.exports = router;
