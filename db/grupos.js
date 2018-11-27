const bcrypt = require('bcrypt');
const validator = require('validator');

const db = require('./mysql.js');
const saltRounds = 10;

function abort(connection, done, error) {
  connection.release();
  done(error);
}

exports.create = function(params, done) {

  let values = [];

  if (params.nivel && !validator.isEmpty(params.nivel)) {
    if (!validator.isInt(params.nivel, { min: 1, max: 3, allow_leading_zeroes: false })) return done('El nivel debe ser un número entre 1 y 3');
    values.push(validator.toInt(params.nivel));
  } else {
    return done('Parámetro requerido: nivel');
  }

  if (params.grado && !validator.isEmpty(params.grado)) {
    if (!validator.isInt(params.grado, { min: 1, max: 6, allow_leading_zeroes: false })) return done('El grado debe ser un número entre 1 y 6');
    values.push(validator.toInt(params.grado));
  } else {
    return done('Parámetro requerido: grado');
  }

  if (params.grupo && !validator.isEmpty(params.grupo)) {
    if (!validator.isInt(params.grupo, { min: 1, max: 6, allow_leading_zeroes: false })) return done('El grupo debe ser un número entre 1 y 6');
    values.push(validator.toInt(params.grupo));
  } else {
    return done('Parámetro requerido: grupo');
  }

  if (params.año_escolar && !validator.isEmpty(params.año_escolar)) {
    let current_year = (new Date()).getFullYear();
    if (!validator.isInt(params.año_escolar, { min: 1950, max: current_year, allow_leading_zeroes: false })) return done('El año escolar debe ser un año válido');
    values.push(validator.toInt(params.año_escolar));
  } else {
    return done('Parámetro requerido: año escolar');
  }

  if (params.id_profesor && !validator.isEmpty(params.id_profesor)) {
    if (!validator.isInt(params.id_profesor, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del profesor no es valido');
    values.push(validator.toInt(params.id_profesor));
  } else {
    return done('Parámetro requerido: id del profesor');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO grupo (nivel, grado, grupo, año_escolar, id_profesor) VALUES (?, ?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW') return done("ID de profesor es incorrecto");
        return done(err);
      }
      if (!result) return done('Error en el registro de grupo');
      return done(null, result.insertId);
    });
  });
};

exports.signupStudent = function(params, done) {

  let values = [];

  if (params.id_grupo && !validator.isEmpty(params.id_grupo)) {
    if (!validator.isInt(params.id_grupo, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del grupo no es valido');
    values.push(validator.toInt(params.id_grupo));
  } else {
    return done('Parámetro requerido: id del grupo');
  }

  if (params.id_estudiante && !validator.isEmpty(params.id_estudiante)) {
    if (!validator.isInt(params.id_estudiante, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del estudiante no es valido');
    values.push(validator.toInt(params.id_estudiante));
  } else {
    return done('Parámetro requerido: id del estudiante');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO estudiante_grupo (id_grupo, id_estudiante) VALUES (?, ?)", values, function (err, result) {
      connection.release();
      if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW') return done("ID de grupo o ID de estudiante son incorrectos");
        if (err.code == 'ER_DUP_ENTRY') return done("Estudiante ya esta inscrito en el grupo");
        return done(err);
      }
      if (!result) return done('Error al registrar estudiante en el grupo');
      return done(null, result.insertId);
    });
  });
};

exports.getId = function(id, done) {
  if (id) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT g.nivel, g.grado, g.grupo, g.año_escolar, g.id_profesor, p.nombre, p.apellido_paterno, p.apellido_materno, p.email FROM grupo AS g INNER JOIN empleado AS p ON g.id_profesor = p.id_empleado WHERE id_grupo = ?", [id], function (err, result) {
        if (err) return abort(connection, done, err);

        if(result.length == 1) {
          connection.query("SELECT e.nombre, e.apellido_paterno, e.apellido_materno, e.id_estudiante FROM estudiante AS e JOIN estudiante_grupo AS eg ON eg.id_estudiante = e.id_estudiante WHERE eg.id_grupo = ?", [id], function (err, result_estudiantes) {
            connection.release();
            if (err) return done(err);

            return done(null, {
              success: true,
              nivel: result[0].nivel,
              grado: result[0].grado,
              grupo: result[0].grupo,
              año_escolar: result[0].año_escolar,
              profesor: {
                id_profesor: result[0].id_profesor,
                nombre: result[0].nombre,
                apellido_paterno: result[0].apellido_paterno,
                apellido_materno: result[0].apellido_materno,
                email: result[0].email
              },
              estudiantes: result_estudiantes
            });
          });
        } else {
          connection.release();
          return done("Grupo no encontrado.");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de grupo");
  }
}

exports.getQuery = function(param, id, done) {
  if (id && param == 'id_profesor' || param == 'nombre' || param == "apellido_paterno" || param == "apellido_materno" || param == "email") {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT g.nivel, g.grado, g.grupo, g.año_escolar, g.id_profesor, p.nombre, p.apellido_paterno, p.apellido_materno, p.email FROM grupo AS g INNER JOIN empleado AS p ON g.id_profesor = p.id_empleado WHERE " + param + " = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            grupos: result
          });
        } else {
          return done("Grupos no encontrados");
        }
      });
    });
  } else {
    return done("Falta parámetro o es incorrecto");
  }
}

exports.getAll = function(done) {
  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT g.nivel, g.grado, g.grupo, g.año_escolar, g.id_profesor, p.nombre, p.apellido_paterno, p.apellido_materno, p.email FROM grupo AS g INNER JOIN empleado AS p ON g.id_profesor = p.id_empleado", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          grupos: result
        });
      } else {
        return done("Grupos no encontrados");
      }
    });
  });
}
