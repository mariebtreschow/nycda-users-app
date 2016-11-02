const express = require('express'),
      pug = require('pug'),
      morgan = require('morgan'),
      fs = require('fs'),
      bodyParser = require('body-parser'),
      app = express();

var dataInMemory = JSON.parse(fs.readFileSync('users.json').toString());

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false })); //send URL encoded data
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.redirect('users');
});

app.get('/users', function(req, res) {
  console.log('Requesting /users');
  res.render('layout.pug', { users: dataInMemory });
});

app.get('/search', function(req, res) {
  console.log('Requesting /search');
  res.render('search.pug', { users: dataInMemory });
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
  for (var i = 0; i < dataInMemory.length; i++) {
    if (searchFirstName(query, dataInMemory[i]) || searchLastName(query, dataInMemory[i])) {
        return dataInMemory[i];
      }
    }
  }

function searchFirstName(query, user) {
    return user.firstname.toLowerCase().includes(query.toLowerCase());
  }

function searchLastName(query, user) {
     return user.lastname.toLowerCase().includes(query.toLowerCase());
  }

app.get('/add-user', function(req, res) {
  res.render('add-user.pug', {});
});

app.post('/add-user', function(req, res) {
  console.log(req.body);
  dataInMemory.push(req.body);

  res.redirect('/users/');

	fs.writeFile('users.json', JSON.stringify(dataInMemory), function (err) {
	   if (err) {
       throw err;
     }
	});
});

var likeCount = JSON.parse(fs.readFileSync('likes.json')).likes;

app.post('/likes', function(req, res) {
  var likeCount = likeCount + 1;

  var likeCountJSONString = JSON.stringify({ likes : likeCount });

  res.json(likeCountJSONString);

  fs.writeFile('likes.json', likeCountJSONString, function () {
    console.log('Likes added to data!');
  });
});


app.listen(3002, function() {
  console.log('User information app listening on port 3002!!!!!!');
});
