'use strict';
var path = require('path');
module.exports = {
  'public': public_
};
var serverSecret = 'admin';
function validate(authToken, serverSecret) {
  var username = new Buffer(authToken, 'base64').toString('ascii');
  var isValid = username === serverSecret; // TODO
  return isValid ? username : null;
}
function public_(req, res) {
  var filename = req.swagger.params.filename.value || '';
  var protectedFiles = ['index.html'] // TODO
  if (protectedFiles.includes(filename)) {
    var authToken = req.swagger.params['auth-token'].value;
    var username = validate(authToken, serverSecret);
    if (!username) {
    	res.status(403).send('403 FORBIDDEN');
    	return;
    }
  }
  res.sendFile(path.resolve(__dirname, '../../..', 'public', filename));
}
