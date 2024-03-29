const validator = require('validator');
const db = require('./mysql.js');
const ibm = require('./parse_ibm.js');

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

function abort(connection, done, error) {
  connection.release();
  done(error);
}

var ibmToString = function(data) {
  let result = "";
  for (var key in data) {

    result += key + ": " + ((data[key].N) * 100).toFixed(2) + "% | ";
  }
  return result;
}

var personalityInsights = new PersonalityInsightsV3({
  version_date: '2017-10-13',
  username: 'e70cff6f-3b64-4599-8578-d812f250ece8',
  password: 'cnElKycCTxZN'
});

exports.create = function(params, id, done) {

  let values = [];

  if (params.titulo && !validator.isEmpty(params.titulo)) {
    if (!validator.isLength(params.titulo, {min: 2, max: 50})) return done('El campo titulo debe tener entre 2 y 50 caracteres');
    values.push(params.titulo.toUpperCase());
  } else {
    return done('Parámetro requerido: titulo');
  }

  if (params.texto && !validator.isEmpty(params.texto)) {
    if (!validator.isLength(params.texto, {min: 2, max: 50000})) return done('El campo texto debe tener entre 2 y 3000 caracteres');
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

  var profileParams = {
    // Get the content from the JSON file.
    content: JSON.stringify(params.texto),
    content_type: 'text/plain',
    consumption_preferences: true,
    content_language: 'es',
    accept_language: 'es',
    raw_scores: true
  };

  personalityInsights.profile(profileParams, function(error, profile) {
    if (error) {
      return done('Error en el registro de aplicacion');
    } else {
      values.push(ibmToString(ibm.deleteShit(profile)));

      db.get(db.WRITE, function(err, connection) {
        if (err) return abort(connection, done, err);

        connection.query("INSERT INTO aplicacion_taller (titulo, texto, id_estudiante, id_taller, evaluacion) VALUES (?, ?, ?, ?, ?)", values, function (err, result) {
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
    }
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

      connection.query("SELECT a.id_aplicacion, a.id_estudiante, a.titulo, a.texto, a.estado, a.evaluacion, t.nombre AS taller, e.curp, e.nombre, e.apellido_paterno, e.apellido_materno FROM aplicacion_taller AS a JOIN taller AS t ON a.id_taller = t.id_taller JOIN estudiante AS e ON a.id_estudiante = e.id_estudiante WHERE a.id_aplicacion = ?", [id], function (err, result) {
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
            evaluacion: result[0].evaluacion,
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

    connection.query("SELECT a.id_aplicacion, a.id_estudiante, a.titulo, a.estado, t.nombre AS taller, e.curp, e.nombre, e.apellido_paterno, e.apellido_materno FROM aplicacion_taller AS a JOIN taller AS t ON a.id_taller = t.id_taller JOIN estudiante AS e ON a.id_estudiante = e.id_estudiante", function (err, result) {
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
