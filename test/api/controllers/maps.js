'use strict';
var publicConfig = {
  key: 'AIzaSyCjDfkIVREKuxcPV0HONUSDycUnOiHzIlU'
};

module.exports = {
  maps: maps
};
var GoogleMapsAPI = require('googlemaps');
var gmAPI = new GoogleMapsAPI(publicConfig);
var params = {
  // center: 'Torino',
  zoom: 15,
  size: '500x400',
  maptype: 'roadmap',
  markers: [
    {
      location: 'Torino',
      label   : '',
      color   : 'red',
      shadow  : true
    },
  ],
  style: [
    {
      feature: 'road',
      element: 'all',
      rules: {
        hue: '0x00ff00'
      }
    }
  ],
};

function maps(req, res) {
  var coordinates = req.swagger.params.coordinates.value; // TODO validate
  params.location = coordinates.join(', ');
  params.markers[0].location = params.location;
  res.json(gmAPI.staticMap(params));
}
