const empleados = require('../db/empleados');

exports.signup = function(req, res) {
  empleados.create(req.body, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(201).send({success: true, data: data});
    }
  })
}

exports.login = function(req, res) {
  req.session.auth = req.session.id;
  empleados.login(req.body.email, req.body.password, function(err, data) {
    if (err) {
      req.session.destroy();
      res.status(401).send({success: false, error: err});
    } else {
      req.session.id_empleado = data.id_empleado;
      req.session.infoEmpleado = data;
      res.status(200).send(data);
    }
  })
}

exports.logout = function(req, res) {
  if(req.session.auth && req.session.id_empleado) {
    req.session.destroy(function(err) {
      if (err) return res.status(400).send({success: false, error: err});
      res.status(200).send({success: true, message: 'Sesión terminada'});
    });
  } else {
    res.status(401).send({success: false, error: 'Sesion no iniciada'});
  }
}

exports.getEmpleado = function(req, res) {
  empleados.getId(req.session.id_empleado, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
