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
