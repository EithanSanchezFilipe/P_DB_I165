const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  date: { type: Date, required: true },
  completed: { type: Boolean, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});
TodoSchema.index({ text: 'text' }, { default_language: 'french' });
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;
