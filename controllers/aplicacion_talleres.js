const aplicaciones = require('../db/aplicacion_talleres');
const ibm = require('./parse_ibm.js');

const PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

//set IBM cloud credentials in this section
var personalityInsights = new PersonalityInsightsV3({
  version_date: '2017-10-13',
  username: 'e70cff6f-3b64-4599-8578-d812f250ece8',
  password: 'cnElKycCTxZN'
});

var ibmToString = function(data) {
  let result = "";
  for (var key in data) {

    result += key + ": " + ((data[key].N) * 100).toFixed(2) + "% | ";
  }
  return result;
}

exports.personality = function(req, res) {
  var profileParams = {
    // Get the content from the JSON file.
    content: JSON.stringify(req.body.text),
    content_type: 'text/plain',
    consumption_preferences: true,
    content_language: 'es',
    accept_language: 'es',
    raw_scores: true
  };

  personalityInsights.profile(profileParams, function(error, profile) {
    if (error) {
      res.status(400).send({success: false, error: error});
    } else {
      //console.log(JSON.stringify(profile, null, 2));
      x = profile;
      var audaciaN = JSON.stringify(x.personality[0].children[0].name, null, 2);
      var audaciaP = JSON.stringify(x.personality[0].children[0].percentile, null, 2);
      var inAr = JSON.stringify(x.personality[0].children[1].name, null, 2);
      var inArP = JSON.stringify(x.personality[0].children[1].percentile, null, 2);
      var emocional = JSON.stringify(x.personality[1].children[2].name, null, 2);
      var emocionalP = JSON.stringify(x.personality[1].children[2].percentile, null, 2);
      var imagin = JSON.stringify(x.personality[0].children[3].name, null, 2);
      var imaginP = JSON.stringify(x.personality[0].children[3].percentile, null, 2);
      var intelec = JSON.stringify(x.personality[0].children[4].name, null, 2);
      var intelecP = JSON.stringify(x.personality[0].children[4].percentile, null, 2);

      res.status(201).send({
        success: true,
        result: ibmToString(ibm.deleteShit(x))
      });
    }
  });
}



exports.create = function(req, res) {
  if (req.session.id && req.session.id_estudiante) {
    aplicaciones.create(req.body, req.session.id_estudiante, function(err, data) {
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

exports.getAplicacion = function(req, res) {
  aplicaciones.getId(req.params.id, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getMine = function(req, res) {
  aplicaciones.getMine(req.session.id_estudiante, function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}

exports.getTodasAplicaciones = function(req, res) {
  aplicaciones.getAll(function(err, data) {
    if (err) {
      res.status(400).send({success: false, error: err});
    } else {
      res.status(200).send(data);
    }
  });
}
