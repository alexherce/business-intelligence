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
