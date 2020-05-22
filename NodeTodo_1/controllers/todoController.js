//var data = [{item:'Learn Node'},{item:'Learn MongoDB'},{item:'start coding'}]
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

//connect to mongodb
mongoose.connect('mongodb://localhost/NodeTodo',{useNewUrlParser:true,useUnifiedTopology: true});

//create schema
var todoSchema = new mongoose.Schema({
    item : String
})

var Todo = mongoose.model('Todo', todoSchema)
// var itemOne = Todo({item:'Learn Node'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved')
// })

var urlencodedParser = bodyParser.urlencoded({extended:false})
module.exports = function (app) {

    app.get('/getTodo', function (req, res) { 
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data})
        })
    })

    app.post('/addTodo',urlencodedParser, function (req, res) {
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) throw err;
            res.json(data);
        })
        //data.push(req.body);
    })

    app.delete('/deleteTodo/:item', function (req, res) {
        console.log(req.params.item)
        Todo.deleteOne({item:req.params.item},function(err){
            if(err) throw err;
            console.log('success')
        })
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data})
        })
        // data = data.filter(function(todo){
        //     return todo.item.replace(/ /g,'-') !== req.params.item;
        // })
    })


}