const express = require('express'),
      pug = require('pug'),
      fs = require('fs'),
      app = express();

var dataInMemory = JSON.parse(fs.readFileSync('users.json').toString());

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.redirect('/users');
});

app.get('/users', function(req, res) {
  console.log('Requesting /users');
  res.send(pug.renderFile('views/application.pug', { users: dataInMemory.users }));
});

app.listen(3002, function() {
  console.log('User information app listening on port 3002!!!!!!');
});
