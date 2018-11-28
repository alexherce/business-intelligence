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

  if (params.email && !validator.isEmpty(params.email)) {
    if (!validator.isEmail(params.email)) return done('El email no es válido');
    values.push(validator.normalizeEmail(params.email));
  } else {
    return done('Parámetro requerido: email');
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

  if (params.area && !validator.isEmpty(params.area)) {
    if (!validator.isInt(params.area, { min: 1, max: 9, allow_leading_zeroes: false })) return done('El area debe ser un número entre 1 y 9');
    values.push(validator.toInt(params.area));
  } else {
    return done('Parámetro requerido: area');
  }

  if (params.telefono && !validator.isEmpty(params.telefono)) {
    if (!validator.isLength(params.telefono, {min: 10, max: 10})) return done('El telefono debe tener 10 números y no debe incluir código de país');
    if (!validator.isInt(params.telefono, { min: 1000000000, max: 9999999999, allow_leading_zeroes: false })) return done('El telefono debe ser un numero válido');
    values.push(params.telefono);
  } else {
    return done('Parámetro requerido: telefono');
  }

  if (params.posicion && !validator.isEmpty(params.posicion)) {
    if (!validator.isAlpha(params.posicion)) return done('La posicion debe contener solo letras');
    if (!validator.isLength(params.posicion, {min: 2, max: 32})) return done('La posicion debe tener entre 2 y 30 caracteres');
    values.push(params.posicion.toUpperCase());
  } else {
    return done('Parámetro requerido: posicion');
  }

  if (params.salario && !validator.isEmpty(params.salario)) {
    if (!validator.isLength(params.salario, {min: 4, max: 7})) return done('El salario debe tener de 4 a 7 digitos');
    if (!validator.isInt(params.salario, { min: 10000, max: 9999999, allow_leading_zeroes: false })) return done('El salario debe ser un numero válido');
    values.push(params.salario);
  } else {
    return done('Parámetro requerido: salario');
  }

  db.get(db.WRITE, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("INSERT INTO empleado (email, password, nombre, apellido_paterno, apellido_materno, area, telefono, posicion, salario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", values, function (err, result) {
      connection.release();
      if (err && err.code == 'ER_DUP_ENTRY') {
        return done("El email ya está registrado");
      } else if (err) {
        return done(err);
      }
      if (!result) return done('Error en el registro de empleado');
      return done(null, result.insertId);
    });
  });
};

exports.login = function(email, password, done) {

  let values = [];

  if (email && !validator.isEmpty(email)) {
    if (!validator.isEmail(email)) return done('El email no es válido');
    values.push(validator.normalizeEmail(email));
  } else {
    return done('Parámetro requerido: email');
  }

  if (password && !validator.isEmpty(password)) {
    if (!validator.isLength(password, {min: 8, max: 50})) return done('La contraseña debe tener entre 8 y 50 caracteres');
  } else {
    return done('Parámetro requerido: contraseña');
  }

  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT * FROM empleado WHERE email = ?", values, function (err, result) {
      connection.release();
      if (err) return done(err);

      if (result.length == 1) {
        // Compare hashed password
        bcrypt.compare('' + password, result[0].password).then(function(matches) {

          if (matches) {
            return done(null, {
              success: true,
              id_empleado: result[0].id_empleado,
              email: result[0].email,
              nombre: result[0].nombre,
              apellido_paterno: result[0].apellido_paterno,
              apellido_materno: result[0].apellido_materno,
              area: result[0].area,
              telefono: result[0].telefono
            });
          } else {
            return done("Contraseña incorrecta.");
          }
        });
      } else {
        return done("Email no encontrado.");
      }
    });
  });
}

exports.getAll = function(done) {
  db.get(db.READ, function(err, connection) {
    if (err) return abort(connection, done, err);

    connection.query("SELECT id_empleado, email, nombre, apellido_paterno, apellido_materno, area, telefono, posicion FROM empleado", function (err, result) {
      connection.release();
      if (err) return done(err);

      if(result.length > 0) {
        return done(null, {
          success: true,
          empleados: result
        });
      } else {
        return done("Empleados no encontrados");
      }
    });
  });
}

exports.getId = function(userId, done) {
  if (userId) {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT email, nombre, apellido_paterno, apellido_materno, area, telefono, posicion, salario FROM empleado WHERE id_empleado = ?", [userId], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length == 1) {
          return done(null, {
            success: true,
            id_empleado: result[0].id_empleado,
            email: result[0].email,
            nombre: result[0].nombre,
            apellido_paterno: result[0].apellido_paterno,
            apellido_materno: result[0].apellido_materno,
            area: result[0].area,
            telefono: result[0].telefono,
            posicion: result[0].posicion,
            salario: result[0].salario
          });
        } else {
          return done("Usuario no encontrado.");
        }
      });
    });
  } else {
    return done("Falta parámetro: id de empleado.");
  }
}

exports.getQuery = function(param, id, done) {
  if (id && param == 'nombre' || param == 'apellido_materno' || param == "apellido_paterno" || param == "email" || param == "area" || param == "posicion"  || param == "salario") {
    db.get(db.READ, function(err, connection) {
      if (err) return abort(connection, done, err);

      connection.query("SELECT email, nombre, apellido_paterno, apellido_materno, area, telefono, posicion FROM empleado WHERE " + param + " = ?", [id], function (err, result) {
        connection.release();
        if (err) return done(err);

        if(result.length > 0) {
          return done(null, {
            success: true,
            empleados: result
          });
        } else {
          return done("Empleados no encontrados");
        }
      });
    });
  } else {
    return done("Falta parámetro o es incorrecto");
  }
}
