const express = require('express');
const router = express.Router();
const generatePassword = require('password-generator');

const empleadosController = require('../controllers/empleados');
const estudiantesController = require('../controllers/estudiantes');
const gruposController = require('../controllers/grupos');
const materiasController = require('../controllers/materias');
const boletasController = require('../controllers/boletas');
const aplicacionesController = require('../controllers/aplicacion_talleres');

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

router.get('/sesion/alumno', function(req, res, next) {
  if(req.session.id_estudiante && req.session.id) {
    res.status(200).send({
      success: true,
      id_estudiante: req.session.id_estudiante,
      infoEstudiante: req.session.infoEstudiante
    });
  } else {
    res.status(401).send({success: false, error: 'No se encontro sesion de estudiante'});
  }
});

router.get('/sesion/empleado', function(req, res, next) {
  if(req.session.id_empleado && req.session.id) {
    res.status(200).send({
      success: true,
      id_empleado: req.session.id_empleado,
      infoEmpleado: req.session.infoEmpleado
    });
  } else {
    res.status(401).send({success: false, error: 'No se encontro sesion de empleado'});
  }
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

router.get('/grupos/profesor', loggedInEmpleado, function(req, res, next) {
  gruposController.getMine(req, res);
});

router.get('/grupos/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  gruposController.getGruposQuery(req, res);
});

// MATERIAS
router.post('/materias/crear', loggedInEmpleado, function(req, res, next) {
  materiasController.create(req, res);
});

router.get('/materias/detalle/:id', loggedInEmpleado, function(req, res, next) {
  materiasController.getMateria(req, res);
});

router.get('/materias/list', loggedInEmpleado, function(req, res, next) {
  materiasController.getTodasMaterias(req, res);
});

router.get('/materias/profesor', loggedInEmpleado, function(req, res, next) {
  materiasController.getMine(req, res);
});

router.get('/materias/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  materiasController.getMateriasQuery(req, res);
});

// BOLETAS
router.post('/boletas/crear', loggedInEmpleado, function(req, res, next) {
  boletasController.create(req, res);
});

router.get('/boletas/consultar/:year', loggedInEstudiante, function(req, res, next) {
  boletasController.getBoletaEstudiante(req, res);
});

router.get('/boletas/id/:id', loggedInEmpleado, function(req, res, next) {
  boletasController.getBoletasEstudiante(req, res);
});

router.get('/boletas/estudiante/:year/:id', loggedInEmpleado, function(req, res, next) {
  boletasController.getBoleta(req, res);
});

router.get('/boletas/list', loggedInEmpleado, function(req, res, next) {
  boletasController.getTodasBoletas(req, res);
});

router.get('/boletas/query/:param/:id', loggedInEmpleado, function(req, res, next) {
  boletasController.getBoletasQuery(req, res);
});

router.get('/boletas/profesor', loggedInEmpleado, function(req, res, next) {
  boletasController.getBoletasMine(req, res);
});

// APLICACION TALLERES
router.post('/aplicacion_talleres/crear', loggedInEstudiante, function(req, res, next) {
  aplicacionesController.create(req, res);
});

router.get('/aplicacion_talleres/detalle/:id', loggedInEmpleado, function(req, res, next) {
  aplicacionesController.getAplicacion(req, res);
});

router.get('/aplicacion_talleres/list', loggedInEmpleado, function(req, res, next) {
  aplicacionesController.getTodasAplicaciones(req, res);
});

router.get('/aplicacion_talleres/estudiante', loggedInEstudiante, function(req, res, next) {
  aplicacionesController.getMine(req, res);
});

module.exports = router;
