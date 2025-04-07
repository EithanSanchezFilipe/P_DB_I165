const { sequelize, DataTypes } = require('../config/database');

const TodoModel = sequelize.define(
  'todo',
  {
    text: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Assurez-vous que le nom du modèle est correct
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  },
  {
    indexes: [
      // add a FULL TEXT index
      { type: 'FULLTEXT', name: 'text_idx', fields: ['text'] }
    ]
  }
);

module.exports = TodoModel;
