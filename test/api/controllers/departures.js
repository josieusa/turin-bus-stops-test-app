'use strict';
var got = require('got');
module.exports = {
  departures: departures
};

function departures(req, res) {
  var id = req.swagger.params.stopId.value; // TODO validate
  got(`http://www.5t.torino.it/ws2.1/rest/stops/${id}/departures`, { json: true }).then(response => {
  res.json(response.body);
  }).catch(error => {
    res.status(error.statusCode).send(error);
  });
}
