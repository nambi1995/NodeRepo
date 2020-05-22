var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();

//SEt up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app)

app.listen(3000);
console.log('You ar elistening to port 3000')

