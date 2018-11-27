const express = require('express');
const router = express.Router();
const generatePassword = require('password-generator');

const empleadosController = require('../controllers/empleados');
const estudiantesController = require('../controllers/estudiantes');
const gruposController = require('../controllers/grupos');

function loggedInEmpleado(req, res, next) {
  if (!req.session.id_empleado || !req.session.id) {
    return res.status(401).send({ success: false, message: 'Empleado no autenticado' });
  }
  next();
}

function loggedInEstudiante(req, res, next) {
  if (!req.session.id_estudiante || !req.session.id) {
    return res.status(401).send({ success: false, message: 'Estudiante no autenticado' });
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

// EMPLEADOS
router.post('/empleados/crear', function(req, res, next) {
  empleadosController.signup(req, res);
});

router.post('/empleados/login', function(req, res, next) {
  empleadosController.login(req, res);
});

router.post('/empleados/logout', loggedInEmpleado, function(req, res, next) {
  empleadosController.logout(req, res);
});

router.get('/empleados/detalle/:id', loggedInEmpleado, function(req, res, next) {
  empleadosController.getEmpleado(req, res);
});

router.get('/empleados/list', loggedInEmpleado, function(req, res, next) {
  empleadosController.getTodosEmpleados(req, res);
});

router.get('/empleados/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  empleadosController.getEmpleadosQuery(req, res);
});

// ESTUDIANTES
router.post('/estudiantes/crear', loggedInEmpleado, function(req, res, next) {
  estudiantesController.signup(req, res);
});

router.post('/estudiantes/login', function(req, res, next) {
  estudiantesController.login(req, res);
});

router.post('/estudiantes/logout', loggedInEstudiante, function(req, res, next) {
  estudiantesController.logout(req, res);
});

router.get('/estudiantes/detalle/:id', loggedInEmpleado, function(req, res, next) {
  estudiantesController.getEstudiante(req, res);
});

router.get('/estudiantes/list', loggedInEmpleado, function(req, res, next) {
  estudiantesController.getTodosEstudiantes(req, res);
});

router.get('/estudiantes/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  estudiantesController.getEstudiantesQuery(req, res);
});

// GRUPOS
router.post('/grupos/crear', loggedInEmpleado, function(req, res, next) {
  gruposController.create(req, res);
});

router.post('/grupos/inscribir', loggedInEmpleado, function(req, res, next) {
  gruposController.signupStudent(req, res);
});

router.get('/grupos/detalle/:id', loggedInEmpleado, function(req, res, next) {
  gruposController.getGrupo(req, res);
});

router.get('/grupos/list', loggedInEmpleado, function(req, res, next) {
  gruposController.getTodosGrupos(req, res);
});

router.get('/grupos/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  gruposController.getGruposQuery(req, res);
});

module.exports = router;
