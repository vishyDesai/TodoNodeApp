var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');


const express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('Started on Port 3000');
});

//POST : /todos - Create Todo

app.post('/todos', (req,res) => {
  var todo = new Todo({
      task: req.body.task
  });

  todo.save().then((doc)=> {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send({
      errorCode: 400,
      errorMessage: err
    })
  })
})
