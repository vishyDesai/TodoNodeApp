var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');

const express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Started on Port ${port}`);
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
});

//GET : /todos - Get All Todo

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.status(200).send({
      todos
    })
  }, (err) => {
    res.status(400).send({
      errorCode: 400,
      errorMessage: err
    });
  });
});

//GET : /todos/:id - Get Specific Todo

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(400).send({
      errorCode: 400,
      errorMessage: 'Invalid Object ID'
    });
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        errorCode: 404,
        errorMessage: 'Data not found'
      });
    }
    res.status(200).send(JSON.stringify(todo,undefined, 2));
  }).catch((err) => {
    res.status(400).send({
      errorCode: 400,
      errorMessage: {err}
    });
  });
});

//DELETE : /todos/:id - Delete specific Todo

app.delete('/todos/:id', (req, res) => {
  var id=req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(400).send({
      errorCode: 400,
      errorMessage: 'Invalid Object ID'
    });
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send({
        errorCode: 404,
        errorMessage: 'ID to be deleted not found'
      });
    }
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send({
      errorCode: 400,
      errorMessage: {err}
    });
  });
});
