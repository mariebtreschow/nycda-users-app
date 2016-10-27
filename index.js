const express = require('express'),
      pug = require('pug'),
      morgan = require('morgan'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express();

var dataInMemory = JSON.parse(fs.readFileSync('users.json').toString());

var findUser = function(query) {
  for (var i = 0; i < dataInMemory.length; i++) {
    if (dataInMemory[i].firstname === query) {
            var foundUser = dataInMemory[i];
            return dataInMemory[i];
        } else {
            var foundUnder = 'Is not in our system.';
      }
    }
  };

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //send URL encoded data
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.redirect('users');
});

app.get('/users', function(req, res) {
  console.log('Requesting /users');
  res.render('application.pug', { users: dataInMemory.users });
});

app.get('/search', function(req, res) {
  console.log('Requesting /search');
  res.render('search.pug', { user: dataInMemory.users });
});

app.get('/search/*', function(req, res) {
  res.render('search-result', { user: dataInMemory.users });
});

app.post('/search', function(req, res) {
  console.log(req.body);
  res.redirect('/search/' + req.body.query);
});

app.get('/search/*', function(req, res) {
  var foundUser = findUser(req.params[0]);
  if (foundUser === undefined) {
  res.send('search-result.pug', { users: dataInMemory.users});

  } else {
  res.send('404.pug', { users: dataInMemory.users });
  }
  console.log(foundUser);
});

app.listen(3002, function() {
  console.log('User information app listening on port 3002!!!!!!');
});
