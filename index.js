const express = require('express'),
      pug = require('pug'),
      morgan = require('morgan'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express();

var dataInMemory = JSON.parse(fs.readFileSync('users.json').toString());

var findUser = function(query) {
  for (var i = 0; i < dataInMemory.length; i++) {
    if (dataInMemory[i].firstname === users.firstname || users.lastname) {
      res.send(pug.renderFile('search-result.pug', { users: dataInMemory.users}));
    } else {
      return res.render('404.pug', { users: dataInMemory.users });
      }
    }
  };

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //send URL encoded data


app.get('/', function(request, response) {
  response.redirect('users');
});

app.get('/users', function(req, res) {
  console.log('Requesting /users');
  res.render('application.pug', { users: dataInMemory.users });
});

app.get('/search', function(req, res) {
  console.log('Search for the damn users');
  res.render('search.pug', { user: dataInMemory.users });
});

app.get('/search/*', function(req, res) {
  res.render('search');
});

app.post('/search', function(req, res) {
  console.log(request.body);
  res.redirect('/search' + request.body.query);
});

app.get('/search/*', function(req, res) {
  res.send('Search a user with query:' + request.params[0]);
  var foundUser = findUser(request.params[0]);

  if (foundUser === undefined) {
    res.send(pug.renderFile('search-result.pug', { users: dataInMemory.users}));

  } else {
    res.render('404.pug', { users: dataInMemory.users });
  }


// SEARCH GOES HERE

});

app.listen(3002, function() {
  console.log('User information app listening on port 3002!!!!!!');
});
