const { Sequelize } = require('sequelize');

const Todo = require('../models').Todo;

const TodoController = {
  createTodo: async (req, res) => {
    const user_id = req.sub;
    const { text, date } = req.body;
    await Todo.create({
      text: text,
      date: date,
      completed: false,
      user_id: user_id
    })
      .then((result) => {
        return res.status(201).json(result);
      })
      .catch((error) => {
        console.error('ADD TODO: ', error);
        return res.status(500);
      });
  },
  getAllTodo: async (req, res) => {
    const user_id = req.sub;
    await Todo.find({ user_id: user_id })
      .sort({ date: 1 })
      .select('-user_id')
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404);
        }
      })
      .catch((error) => {
        console.error('GET ALL TODO: ', error);
        return res.status(500);
      });
  },
  editTodo: async (req, res) => {
    const user_id = req.sub;
    const query = { id: req.params.id, user_id: user_id };
    const data = req.body;
    const result = await Todo.findOne({ query });
    if (result) {
      result.completed = data.completed ? data.completed : false;
      result.text = data.text ? data.text : result.text;
      result.date = data.date ? data.date : result.date;
      await result
        .save()
        .then(() => {
          return res.status(200).json(result);
        })
        .catch((error) => {
          console.error('UPDATE TODO: ', error);
          return res.status(500);
        });
    } else {
      return res.status(404);
    }
  },
  deleteTodo: (req, res) => {
    const user_id = req.sub;
    const todo_id = req.params.id;
    console.log('todo_id', req.params);
    const query = { _id: todo_id, user_id: user_id };
    Todo.deleteOne(query)
      .then(() => {
        return res.status(200).json({ id: todo_id });
      })
      .catch((error) => {
        console.error('DELETE TODO: ', error);
        return res.status(500);
      });
  },
  getSearchTodo: async (req, res) => {
    const user_id = req.sub;
    const query = req.query.q;
    await Todo.find({
      where: [
        {
          user_id: user_id
        },
        Sequelize.literal(`MATCH (text) AGAINST ('*${query}*' IN BOOLEAN MODE)`)
      ],
      order: [['date', 'ASC']],
      attributes: { exclude: ['user_id'] }
    })
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404);
        }
      })
      .catch((error) => {
        console.error('SEARCH TODO: ', error);
        return res.status(500);
      });
  }
};

module.exports = TodoController;
