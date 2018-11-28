const materias = require('../db/materias');

exports.create = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    materias.create(req.body, function(err, data) {
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

exports.getTodasMaterias = function(req, res) {
  materias.getAll(function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMateria = function(req, res) {
  materias.getId(req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMateriasQuery = function(req, res) {
  console.log(req.params);
  materias.getQuery(req.params.param, req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMine = function(req, res) {
  materias.getMine(req.session.id_empleado, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
