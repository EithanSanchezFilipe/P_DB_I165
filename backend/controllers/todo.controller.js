const { json } = require('sequelize');
const redisClient = require('../config/redis');
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
        const todo = {
          _id: result._id,
          text: result.text,
          date: result.date,
          completed: result.completed,
          user_id: result.user_id,
          __v: result.__v
        };
        redisClient.rPush(`todos:${user_id}`, JSON.stringify(todo)).catch((error) => {
          console.error('Redis could not add the todo', error);
        });
        redisClient.expire(`todos:${user_id}`, 3600);
        return res.status(201).json(result);
      })
      .catch((error) => {
        console.error('ADD TODO: ', error);
        return res.status(500);
      });
  },
  getAllTodo: async (req, res) => {
    const user_id = req.sub;
    const todosRedis = await redisClient.lRange(`todos:${user_id}`, 0, -1);
    if (todosRedis.length > 0) {
      return res.status(200).json(todosRedis.map(JSON.parse));
    } else {
      await Todo.find({ user_id: user_id })
        .sort({ date: 1 })
        .then((result) => {
          if (result) {
            const todos = result.map((todo) => JSON.stringify(todo));
            if (todos.length > 0) {
              redisClient.lRem(`todos:${user_id}`, 0, JSON.stringify(result)).catch((error) => {
                console.error('Redis could not remove the todos', error);
              });
              redisClient.expire(`todos:${user_id}`, 3600);
            }
            return res.status(200).json(result);
          } else {
            return res.status(404);
          }
        })
        .catch((error) => {
          console.error('GET ALL TODO: ', error);
          return res.status(500);
        });
    }
  },
  editTodo: async (req, res) => {
    const user_id = req.sub;
    const query = { _id: req.params.id, user_id: user_id };
    const data = req.body;

    const result = await Todo.findOne(query);
    redisClient.lRem(`todos:${user_id}`, 0, JSON.stringify(result)).catch((error) => {
      console.error('Redis could not edit the todo', error);
    });

    if (result) {
      result.completed = data.completed ? data.completed : false;
      result.text = data.text ? data.text : result.text;
      result.date = data.date ? data.date : result.date;

      await result
        .save()
        .then(() => {
          redisClient.rPush(`todos:${user_id}`, JSON.stringify(result)).catch((error) => {
            console.error('Redis could not edit the todo', error);
          });
          return res.status(200).json(result);
        })
        .catch((error) => {
          console.error('UPDATE TODO: ', error);
          return res.status(500).json({ error: 'Error updating todo' });
        });
    } else {
      return res.status(404).json({ message: 'Todo not found' });
    }
  },
  deleteTodo: (req, res) => {
    const user_id = req.sub;
    const todo_id = req.params.id;
    const query = { _id: todo_id, user_id };

    Todo.findOneAndDelete(query)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({ message: 'Todo not found' });
        }
        return redisClient
          .lRem(`todos:${user_id}`, 0, JSON.stringify(todo))
          .then(() => {
            return res.status(200).json({ _id: todo_id });
          })
          .catch((redisErr) => {
            console.error('Redis could not delete the todo', redisErr);
            return res.status(200).json({ _id: todo_id, message: 'Redis cache not updated' });
          });
      })
      .catch((error) => {
        console.error('DELETE TODO:', error);
        return res.status(500).json({ error: 'Server error deleting todo' });
      });
  },
  getSearchTodo: async (req, res) => {
    const user_id = req.sub;
    const q = req.query.q;
    const query = { $text: { $search: q, $language: 'french' }, user_id: user_id };
    await Todo.find(query, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
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
