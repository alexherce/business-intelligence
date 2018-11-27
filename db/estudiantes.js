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

  if (params.nombre && !validator.isEmpty(params.nombre)) {
    if (!validator.isAlpha(params.nombre)) return done('El nombre debe contener solo letras');
    if (!validator.isLength(params.nombre, {min: 2, max: 32})) return done('El nombre debe tener entre 2 y 32 caracteres');
    values.push(params.nombre[0].toUpperCase() + params.nombre.slice(1).toLowerCase());
  } else {
    return done('Parámetro requerido: nombre');
  }

  if (params.apellido_paterno && !validator.isEmpty(params.apellido_paterno)) {
    if (!validator.isAlpha(params.apellido_paterno)) return done('El apellido paterno debe contener solo letras');
    if (!validator.isLength(params.apellido_paterno, {min: 2, max: 32})) return done('El apellido paterno debe tener entre 2 y 32 caracteres');
    values.push(params.apellido_paterno[0].toUpperCase() + params.apellido_paterno.slice(1).toLowerCase());
  } else {
    return done('Parámetro requerido: apellido paterno');
  }

  if (params.apellido_materno && !validator.isEmpty(params.apellido_materno)) {
    if (!validator.isAlpha(params.apellido_materno)) return done('El apellido materno debe contener solo letras');
    if (!validator.isLength(params.apellido_materno, {min: 2, max: 32})) return done('El apellido materno debe tener entre 2 y 32 caracteres');
    values.push(params.apellido_materno[0].toUpperCase() + params.apellido_materno.slice(1).toLowerCase());
  } else {
    return done('Parámetro requerido: apellido materno');
  }

  if (params.dia_nacimiento && !validator.isEmpty(params.dia_nacimiento)) {
    if (!validator.isInt(params.dia_nacimiento, { min: 1, max: 31, allow_leading_zeroes: true })) return done('El día de nacimiento debe ser un número entre 1 y 31');
    values.push(validator.toInt(params.dia_nacimiento));
  } else {
    return done('Parámetro requerido: día de nacimiento');
  }

  if (params.mes_nacimiento && !validator.isEmpty(params.mes_nacimiento)) {
    if (!validator.isInt(params.mes_nacimiento, { min: 1, max: 12, allow_leading_zeroes: true })) return done('El mes de nacimiento debe ser un número entre 1 y 12');
    values.push(validator.toInt(params.mes_nacimiento));
  } else {
    return done('Parámetro requerido: mes de nacimiento');
  }

  if (params.año_nacimiento && !validator.isEmpty(params.año_nacimiento)) {
    let current_year = (new Date()).getFullYear();
    if (!validator.isInt(params.año_nacimiento, { min: 1950, max: current_year, allow_leading_zeroes: false })) return done('El año de nacimiento debe ser un año válido');
    if ((current_year - params.año_nacimiento) < 3) return done('Lo sentimos, solo alumnos mayores a 3 años');
    values.push(validator.toInt(params.año_nacimiento));
  } else {
    return done('Parámetro requerido: año de nacimiento');
  }

  if (params.password && !validator.isEmpty(params.password)) {
    if (!validator.isLength(params.password, {min: 8, max: 50})) return done('La contraseña debe tener entre 8 y 50 caracteres');
    if (validator.isLowercase(params.password)) return done('La contraseña debe tener al menos una mayúscula');
    if (validator.isUppercase(params.password)) return done('La contraseña debe tener al menos una minúscula');
    if (validator.isAlpha(params.password)) return done('La contraseña debe tener numeros y/o símbolos (_, -, ., /, ?)');
  } else {
    return done('Parámetro requerido: contraseña');
  }

  if (params.password_verify && !validator.isEmpty(params.password_verify)) {
    if (!validator.equals(params.password_verify, params.password)) return done('Las contraseñas no coinciden');
    values.push(bcrypt.hashSync(params.password, saltRounds));
  } else {
    return done('Parámetro requerido: contraseña');
  }

  if (params.alergias && !validator.isEmpty(params.alergias)) {
    if (!validator.isAlpha(params.alergias)) return done('El campo alergias solo puede tener letras');
    if (!validator.isLength(params.alergias, {min: 2, max: 50})) return done('El campo alergias debe tener entre 2 y 50 caracteres');
    values.push(params.alergias.toUpperCase());
  } else {
    values.push("");
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO estudiante (nombre, apellido_paterno, apellido_materno, dia_nacimiento, mes_nacimiento, año_nacimiento, password, alergias) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err && err.code == 'ER_DUP_ENTRY') {
        return done("El estudiante ya está registrado");
      } else if (err) {
        return done(err);
      }
      if (!result) return done('Error en el registro de estudiante');
      return done(null, result.insertId);
    });
  });
};

exports.login = function(id, password, done) {

  let values = [];

  if (id && !validator.isEmpty(id)) {
    if (!validator.isInt(id, { min: 1, max: 9999, allow_leading_zeroes: false })) return done('El id no es válido');
  } else {
    return done('Parámetro requerido: id de estudiante');
  }

  if (password && !validator.isEmpty(password)) {
    if (!validator.isLength(password, {min: 8, max: 50})) return done('La contraseña debe tener entre 8 y 50 caracteres');
  } else {
    return done('Parámetro requerido: contraseña');
  }

  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT * FROM estudiante WHERE id_estudiante = ?", [id], function (err, result) {
      connection.release();
      if (err) return done(err);

      if (result.length == 1) {
        if (result[0].estado != 1) return done("Cuenta de alumno inactiva");

        // Compare hashed password
        bcrypt.compare('' + password, result[0].password).then(function(matches) {
          if (matches) {
            return done(null, {
              success: true,
              id_estudiante: result[0].id_estudiante,
              nombre: result[0].nombre,
              apellido_paterno: result[0].apellido_paterno,
              apellido_materno: result[0].apellido_materno
            });
          } else {
            return done("Contraseña incorrecta.");
          }
        });
      } else {
        return done("Estudiante no encontrado.");
      }
    });
  });
}

exports.getAll = function(done) {
  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT id_estudiante, nombre, apellido_paterno, apellido_materno, dia_nacimiento, mes_nacimiento, año_nacimiento FROM estudiante", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          estudiantes: result
        });
      } else {
        return done("Estudiantes no encontrados");
      }
    });
  });
}

exports.getId = function(userId, done) {
  if (userId) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT nombre, apellido_paterno, apellido_materno, dia_nacimiento, mes_nacimiento, año_nacimiento, alergias FROM estudiante WHERE id_estudiante = ?", [userId], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length == 1) {
          return done(null, {
            success: true,
            id_estudiante: result[0].id_estudiante,
            nombre: result[0].nombre,
            apellido_paterno: result[0].apellido_paterno,
            apellido_materno: result[0].apellido_materno,
            dia_nacimiento: result[0].dia_nacimiento,
            mes_nacimiento: result[0].mes_nacimiento,
            año_nacimiento: result[0].año_nacimiento,
            alergias: result[0].alergias
          });
        } else {
          return done("Estudiante no encontrado.");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de estudiante.");
  }
}

exports.getQuery = function(param, id, done) {
  if (id && param == 'nombre' || param == 'apellido_materno' || param == "apellido_paterno" || param == "dia_nacimiento" || param == "mes_nacimiento"  || param == "año_nacimiento") {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT nombre, apellido_paterno, apellido_materno, dia_nacimiento, mes_nacimiento, año_nacimiento FROM estudiante WHERE " + param + " = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            estudiantes: result
          });
        } else {
          return done("Estudiantes no encontrados");
        }
      });
    });
  } else {
    return done("Falta parámetro o es incorrecto");
  }
}
