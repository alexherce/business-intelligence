const grupos = require('../db/grupos');

exports.create = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    grupos.create(req.body, function(err, data) {
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

exports.signupStudent = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    grupos.signupStudent(req.body, function(err, data) {
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

exports.getTodosGrupos = function(req, res) {
  grupos.getAll(function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getGrupo = function(req, res) {
  grupos.getId(req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getGruposQuery = function(req, res) {
  console.log(req.params);
  grupos.getQuery(req.params.param, req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMine = function(req, res) {
  grupos.getMine(req.session.id_empleado, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
