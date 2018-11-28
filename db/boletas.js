const validator = require('validator');

const db = require('./mysql.js');

function abort(connection, done, error) {
  connection.release();
  done(error);
}

exports.create = function(params, done) {

  let values = [];

  if (params.calificacion && !validator.isEmpty(params.calificacion)) {
    if (!validator.isInt(params.calificacion, { min: 0, max: 100, allow_leading_zeroes: false })) return done('La calificacion debe ser un valor entre 0 y 100');
    values.push(validator.toInt(params.calificacion));
  } else {
    return done('Parámetro requerido: calificacion');
  }

  if (params.comentarios && !validator.isEmpty(params.comentarios)) {
    if (!validator.isLength(params.comentarios, {min: 2, max: 500})) return done('El campo comentarios debe tener entre 2 y 500 caracteres');
    values.push(params.comentarios.toUpperCase());
  } else {
    values.push("");
  }

  if (params.debilidades && !validator.isEmpty(params.debilidades)) {
    if (!validator.isLength(params.debilidades, {min: 2, max: 500})) return done('El campo debilidades debe tener entre 2 y 500 caracteres');
    values.push(params.debilidades.toUpperCase());
  } else {
    values.push("");
  }

  if (params.fortalezas && !validator.isEmpty(params.fortalezas)) {
    if (!validator.isLength(params.fortalezas, {min: 2, max: 500})) return done('El campo fortalezas debe tener entre 2 y 500 caracteres');
    values.push(params.fortalezas.toUpperCase());
  } else {
    values.push("");
  }

  if (params.id_estudiante && !validator.isEmpty(params.id_estudiante)) {
    if (!validator.isInt(params.id_estudiante, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del estudiante no es valido');
    values.push(validator.toInt(params.id_estudiante));
  } else {
    return done('Parámetro requerido: id del estudiante');
  }

  if (params.id_trimestre && !validator.isEmpty(params.id_trimestre)) {
    if (!validator.isInt(params.id_trimestre, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del trimestre no es valido');
    values.push(validator.toInt(params.id_trimestre));
  } else {
    return done('Parámetro requerido: id del trimestre');
  }

  if (params.id_materia && !validator.isEmpty(params.id_materia)) {
    if (!validator.isInt(params.id_materia, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id de la materia no es valido');
    values.push(validator.toInt(params.id_materia));
  } else {
    return done('Parámetro requerido: id de la materia');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO boleta (calificacion, comentarios, debilidades, fortalezas, id_estudiante, id_trimestre, id_materia) VALUES (?, ?, ?, ?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW') return done("ID de materia, ID de estudiante o ID de trimestre es incorrecto");
        if (err.code == 'ER_DUP_ENTRY') return done("Ya hay una calificacion para el estudiante en la materia y en el trimestre seleccionado");
        return done(err);
      }
      if (!result) return done('Error en el registro de calificacion');
      return done(null, result.insertId);
    });
  });
};

exports.getBoletaEstudiante = function(year, userId, done) {
  if (year && userId) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT b.id_materia, m.nombre AS materia, JSON_OBJECTAGG(t.numero, b.calificacion) AS calificaciones, m.id_profesor FROM boleta AS b JOIN materia AS m ON b.id_materia = m.id_materia JOIN trimestre AS t ON b.id_trimestre = t.id_trimestre WHERE t.año = ? AND b.id_estudiante = ? GROUP BY b.id_materia", [year, userId], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            calificaciones: result
          });
        } else {
          return done("Calificaciones no encontradas");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de estudiante o año");
  }
}

exports.getBoletas = function(userId, done) {
  if (userId) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT b.id_materia, m.nombre AS materia, JSON_OBJECTAGG(t.numero, b.calificacion) AS calificaciones, m.id_profesor, t.año FROM boleta AS b JOIN materia AS m ON b.id_materia = m.id_materia JOIN trimestre AS t ON b.id_trimestre = t.id_trimestre WHERE b.id_estudiante = ? GROUP BY b.id_materia, t.año", [userId], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            calificaciones: result
          });
        } else {
          return done("Calificaciones no encontradas");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de estudiante");
  }
}

exports.getAll = function(done) {
  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT b.id_materia, e.curp, e.nombre, e.apellido_paterno, e.apellido_materno, m.nombre AS materia, b.id_estudiante, JSON_OBJECTAGG(t.numero, b.calificacion) AS calificaciones, t.año, m.id_profesor FROM boleta AS b JOIN materia AS m ON b.id_materia = m.id_materia JOIN trimestre AS t ON b.id_trimestre = t.id_trimestre JOIN estudiante AS e ON b.id_estudiante = e.id_estudiante GROUP BY b.id_estudiante, b.id_materia, t.año", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          boletas: result
        });
      } else {
        return done("Boletas no encontradas");
      }
    });
  });
}

exports.getQuery = function(param, id, done) {
  if (id && param == 'año' || param == 'numero' || param == "id_profesor") {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT b.id_materia, e.curp, e.nombre, e.apellido_paterno, e.apellido_materno, m.nombre AS materia, b.id_estudiante, JSON_OBJECTAGG(t.numero, b.calificacion) AS calificaciones, t.año, m.id_profesor FROM boleta AS b JOIN materia AS m ON b.id_materia = m.id_materia JOIN trimestre AS t ON b.id_trimestre = t.id_trimestre JOIN estudiante AS e ON b.id_estudiante = e.id_estudiante WHERE " + param + " = ? GROUP BY b.id_estudiante, b.id_materia, t.año", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            boletas: result
          });
        } else {
          return done("Boletas no encontradas");
        }
      });
    });
  } else {
    return done("Falta parámetro o es incorrecto");
  }
}
