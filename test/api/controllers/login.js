'use strict';
module.exports = {
  login: login
};
var knex = require('knex')({
  client: 'pg',
  connection: {
    user : 'postgres',
    password : 'postgres',
	database: 'postgres'
  }
});
var md5 = require('md5');
function login(req, res) {
  var username = req.swagger.params.username.value;
  var password = req.swagger.params.password.value;
  knex
.select('*').from('users').where('username', username).andWhere('password', password)
  .then(function(rows){
    if(rows.length > 0) {
		var fakeToken = new Buffer(username).toString('base64');
		res.redirect(`index.html?auth-token=${fakeToken}`);
		return;
	}
    res.status(401).send('401 UNAUTHORIZED');
  });
}
