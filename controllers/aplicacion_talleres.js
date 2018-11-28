const aplicaciones = require('../db/aplicacion_talleres');

exports.create = function(req, res) {
  if (req.session.id && req.session.id_estudiante) {
    aplicaciones.create(req.body, req.session.id_estudiante, function(err, data) {
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

exports.getAplicacion = function(req, res) {
  aplicaciones.getId(req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMine = function(req, res) {
  aplicaciones.getMine(req.session.id_estudiante, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getTodasAplicaciones = function(req, res) {
  aplicaciones.getAll(function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
