const boletas = require('../db/boletas');

exports.create = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 4) {
    boletas.create(req.body, function(err, data) {
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

exports.getBoletaEstudiante = function(req, res) {
  if (req.session.id && req.session.id_estudiante) {
    boletas.getBoletaEstudiante(req.params.year, req.session.id_estudiante, function(err, data) {
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

exports.getBoleta = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    boletas.getBoletaEstudiante(req.params.year, req.params.id, function(err, data) {
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

exports.getTodasBoletas = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    boletas.getAll(function(err, data) {
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

exports.getBoletasQuery = function(req, res) {
  if (req.session.id && req.session.id_empleado && req.session.infoEmpleado.area < 3) {
    boletas.getQuery(req.params.param, req.params.id, function(err, data) {
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

exports.getBoletasMine = function(req, res) {
  if (req.session.id && req.session.id_empleado) {
    boletas.getQuery('id_profesor', req.session.id_empleado, function(err, data) {
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
