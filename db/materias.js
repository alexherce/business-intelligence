const validator = require('validator');

const db = require('./mysql.js');
const saltRounds = 10;

function abort(connection, done, error) {
  connection.release();
  done(error);
}

exports.create = function(params, done) {

  let values = [];

  if (params.nombre && !validator.isEmpty(params.nombre)) {
    if (!validator.isAlpha(params.nombre)) return done('El nombre debe contener solo letras');
    if (!validator.isLength(params.nombre, {min: 2, max: 32})) return done('El nombre debe tener entre 2 y 32 caracteres');
    values.push(params.nombre.toUpperCase());
  } else {
    return done('Parámetro requerido: nombre');
  }

  if (params.hora_inicio && !validator.isEmpty(params.hora_inicio)) {
    if (!validator.isLength(params.hora_inicio, {min: 5, max: 5})) return done('La hora de inicio debe estar en formato HH:MM');
    if (!validator.contains(params.hora_inicio, ':')) return done('La hora de inicio debe estar en formato HH:MM');

    let i = params.hora_inicio.indexOf(':');
    var hora = params.hora_inicio.slice(0, i).trim();
    var minutos = params.hora_inicio.slice(i + 1, params.hora_inicio.length).trim();

    if (!validator.isInt(hora, { min: 00, max: 23, allow_leading_zeroes: true })) return done('La hora de inicio debe ser un numero entre 00 y 23');
    if (!validator.isInt(minutos, { min: 00, max: 59, allow_leading_zeroes: true })) return done('Los minutos de inicio deben ser un numero entre 00 y 59');

    values.push(params.hora_inicio);
  } else {
    return done('Parámetro requerido: hora de inicio');
  }

  if (params.hora_fin && !validator.isEmpty(params.hora_fin)) {
    if (!validator.isLength(params.hora_fin, {min: 5, max: 5})) return done('La hora de fin debe estar en formato HH:MM');
    if (!validator.contains(params.hora_fin, ':')) return done('La hora de fin debe estar en formato HH:MM');

    let i = params.hora_fin.indexOf(':');
    var hora = params.hora_fin.slice(0, i).trim();
    var minutos = params.hora_fin.slice(i + 1, params.hora_fin.length).trim();

    if (!validator.isInt(hora, { min: 00, max: 23, allow_leading_zeroes: true })) return done('La hora de fin debe ser un numero entre 00 y 23');
    if (!validator.isInt(minutos, { min: 00, max: 59, allow_leading_zeroes: true })) return done('Los minutos de fin deben ser un numero entre 00 y 59');

    values.push(params.hora_fin);
  } else {
    return done('Parámetro requerido: hora de inicio');
  }

  if (params.id_profesor && !validator.isEmpty(params.id_profesor)) {
    if (!validator.isInt(params.id_profesor, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del profesor no es valido');
    values.push(validator.toInt(params.id_profesor));
  } else {
    return done('Parámetro requerido: id del profesor');
  }

  if (params.id_grupo && !validator.isEmpty(params.id_grupo)) {
    if (!validator.isInt(params.id_grupo, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id del grupo no es valido');
    values.push(validator.toInt(params.id_grupo));
  } else {
    return done('Parámetro requerido: id del grupo');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO materia (nombre, hora_inicio, hora_fin, id_profesor, id_grupo) VALUES (?, ?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err) {
        if (err.code == 'ER_NO_REFERENCED_ROW_2' || err.code == 'ER_NO_REFERENCED_ROW') return done("ID de profesor o ID de grupo es incorrecto");
        return done(err);
      }
      if (!result) return done('Error en el registro de materia');
      return done(null, result.insertId);
    });
  });
};

exports.getId = function(id, done) {
  if (id) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT m.id_materia, m.nombre AS materia, m.hora_inicio, m.hora_fin, m.id_profesor, m.id_grupo, p.nombre, p.apellido_paterno, p.apellido_materno, g.nivel, g.grado, g.grupo, g.año_escolar FROM materia AS m JOIN empleado AS p ON m.id_profesor = p.id_empleado JOIN grupo AS g ON m.id_grupo = g.id_grupo WHERE m.id_materia = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length == 1) {
          return done(null, {
            success: true,
            id_materia: result[0].id_materia,
            materia: result[0].materia,
            hora_inicio: result[0].hora_inicio,
            hora_fin: result[0].hora_fin,
            profesor: {
              id_empleado: result[0].id_profesor,
              nombre: result[0].nombre,
              apellido_paterno: result[0].apellido_paterno,
              apellido_materno: result[0].apellido_materno
            },
            grupo: {
              id_grupo: result[0].id_grupo,
              nivel: result[0].nivel,
              grado: result[0].grado,
              grupo: result[0].grupo,
              año_escolar: result[0].año_escolar
            }
          });
        } else {
          return done("Materia no encontrada");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de materia");
  }
}

exports.getQuery = function(param, id, done) {
  if (id && param == 'hora_inicio' || param == 'hora_fin' || param == "año_escolar" || param == "nivel" || param == "grado" || param == 'grupo' || param == 'id_empleado') {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT m.id_materia, m.nombre AS materia, m.hora_inicio, m.hora_fin, m.id_profesor, m.id_grupo, p.nombre, p.apellido_paterno, p.apellido_materno, g.nivel, g.grado, g.grupo, g.año_escolar FROM materia AS m JOIN empleado AS p ON m.id_profesor = p.id_empleado JOIN grupo AS g ON m.id_grupo = g.id_grupo WHERE " + param + " = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            materias: result
          });
        } else {
          return done("Materias no encontradas");
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

    connection.query("SELECT m.id_materia, m.nombre AS materia, m.hora_inicio, m.hora_fin, m.id_profesor, m.id_grupo, p.nombre, p.apellido_paterno, p.apellido_materno, g.nivel, g.grado, g.grupo, g.año_escolar FROM materia AS m JOIN empleado AS p ON m.id_profesor = p.id_empleado JOIN grupo AS g ON m.id_grupo = g.id_grupo", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          materias: result
        });
      } else {
        return done("Materias no encontradas");
      }
    });
  });
}

exports.getMine = function(id, done) {
  if (id) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT m.id_materia, m.nombre AS materia, m.hora_inicio, m.hora_fin, m.id_profesor, m.id_grupo, p.nombre, p.apellido_paterno, p.apellido_materno, g.nivel, g.grado, g.grupo, g.año_escolar FROM materia AS m JOIN empleado AS p ON m.id_profesor = p.id_empleado JOIN grupo AS g ON m.id_grupo = g.id_grupo WHERE m.id_profesor = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            materias: result
          });
        } else {
          return done("Materias no encontradas");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de profesor");
  }
}
