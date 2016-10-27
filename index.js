const express = require('express'),
      pug = require('pug'),
      morgan = require('morgan'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express();

var dataInMemory = JSON.parse(fs.readFileSync('users.json').toString());


console.log(dataInMemory);

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
  res.render('search.pug', { users: dataInMemory.users });
});

app.post('/search', function(req, res) {
  console.log(req.body);
  res.redirect('/search/' + req.body.query);
});

app.get('/search/*', function(req, res) {
  var foundUser = findUser(req.params[0]);
  if (foundUser) {
    res.render('search-result.pug', { user: foundUser});
  } else {
    res.render('404.pug', { user: foundUser});
  }
  console.log(foundUser);
});

function findUser(query) {
  for (var i = 0; i < dataInMemory.users.length; i++) {
    if (searchFirstName(query, dataInMemory.users[i]) || searchLastName(query, dataInMemory.users[i])) {
        return dataInMemory.users[i];
      }
    }
  }

function searchFirstName(query, user) {
    if (user.firstname.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  }

function searchLastName(query, user) {
    if (user.lastname.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
  }

app.listen(3002, function() {
  console.log('User information app listening on port 3002!!!!!!');
});
