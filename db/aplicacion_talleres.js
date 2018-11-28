const validator = require('validator');

const db = require('./mysql.js');

function abort(connection, done, error) {
  connection.release();
  done(error);
}

exports.create = function(params, id, done) {

  let values = [];

  if (params.titulo && !validator.isEmpty(params.titulo)) {
    if (!validator.isLength(params.titulo, {min: 2, max: 50})) return done('El campo titulo debe tener entre 2 y 50 caracteres');
    values.push(params.titulo.toUpperCase());
  } else {
    return done('Parámetro requerido: titulo');
  }

  if (params.texto && !validator.isEmpty(params.texto)) {
    if (!validator.isLength(params.texto, {min: 2, max: 3000})) return done('El campo texto debe tener entre 2 y 3000 caracteres');
    values.push(params.texto);
  } else {
    return done('Parámetro requerido: texto');
  }

  if (id) {
    values.push(id);
  } else {
    return done('Parámetro requerido: id del estudiante');
  }

  if (params.id_taller && !validator.isEmpty(params.id_taller)) {
    if (!validator.isInt(params.id_taller, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del taller no es valido');
    values.push(validator.toInt(params.id_taller));
  } else {
    return done('Parámetro requerido: id del taller');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO aplicacion_taller (titulo, texto, id_estudiante, id_taller) VALUES (?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW') return done("ID de taller o ID de estudiante");
        if (err.code == 'ER_DUP_ENTRY') return done("Ya hay una aplicacion del alumno al taller seleccionado");
        return done(err);
      }
      if (!result) return done('Error en el registro de aplicacion');
      return done(null, result.insertId);
    });
  });
};

exports.getMine = function(id, done) {
  if (id) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT a.id_aplicacion, a.titulo, a.estado, t.nombre AS taller FROM aplicacion_taller AS a JOIN taller AS t ON a.id_taller = t.id_taller WHERE a.id_estudiante = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            aplicaciones: result
          });
        } else {
          return done("Aplicacion a talleres no encontradas");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de estudiante");
  }
}

exports.getId = function(id, done) {
  if (id) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT a.id_aplicacion, a.id_estudiante, a.titulo, a.texto, a.estado, t.nombre AS taller, e.nombre, e.apellido_paterno, e.apellido_materno FROM aplicacion_taller AS a JOIN taller AS t ON a.id_taller = t.id_taller JOIN estudiante AS e ON a.id_estudiante = e.id_estudiante WHERE a.id_aplicacion = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length == 1) {
          return done(null, {
            success: true,
            id_aplicacion: result[0].id_aplicacion,
            titulo: result[0].titulo,
            texto: result[0].texto,
            estado: result[0].estado,
            taller: result[0].taller,
            estudiante: {
              id_estudiante: result[0].id_estudiante,
              nombre: result[0].nombre,
              apellido_paterno: result[0].apellido_paterno,
              apellido_materno: result[0].apellido_materno
            }
          });
        } else {
          return done("Aplicacion a taller no encontrada");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de aplicacion");
  }
}

exports.getAll = function(done) {
  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT a.id_aplicacion, a.id_estudiante, a.titulo, a.estado, t.nombre AS taller, e.nombre, e.apellido_paterno, e.apellido_materno FROM aplicacion_taller AS a JOIN taller AS t ON a.id_taller = t.id_taller JOIN estudiante AS e ON a.id_estudiante = e.id_estudiante", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          aplicaciones: result
        });
      } else {
        return done("Aplicaciones a talleres no encontradas");
      }
    });
  });
}
