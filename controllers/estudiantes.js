const estudiantes = require('../db/estudiantes');

exports.signup = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    estudiantes.create(req.body, function(err, data) {
      if (err) {
        res.status(400).send({success: false, error: err});
      } else {
        res.status(201).send({success: true, data: data});
      }
    })
  } else {
    res.status(401).send({success: false, error: 'No tienes permisos suficientes'});
  }
}

exports.login = function(req, res) {
  req.session.auth = req.session.id;
  estudiantes.login(req.body.id_estudiante, req.body.password, function(err, data) {
    if (err) {
      req.session.destroy();
      res.status(401).send({success: false, error: err});
    } else {
      req.session.id_estudiante = data.id_estudiante;
      req.session.infoEstudiante = data;
      res.status(200).send(data);
    }
  })
}

exports.logout = function(req, res) {
  if (req.session.id && req.session.id_estudiante) {
    req.session.destroy(function(err) {
      if (err) return res.status(400).send({success: false, error: err});
      res.status(200).send({success: true, message: 'Sesión terminada'});
    });
  } else {
    res.status(401).send({success: false, error: 'Sesion no iniciada'});
  }
}

exports.getTodosEstudiantes = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    estudiantes.getAll(function(err, data) {
      if (err) {
        res.status(400).send({success: false, error: err});
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(401).send({success: false, error: 'No tienes permisos suficientes'});
  }
}

exports.getEstudiante = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    estudiantes.getId(req.params.id, function(err, data) {
      if (err) {
        res.status(400).send({success: false, error: err});
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(401).send({success: false, error: 'No tienes permisos suficientes'});
  }
}

exports.getEstudiantesQuery = function(req, res) {
  estudiantes.getQuery(req.params.param, req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
