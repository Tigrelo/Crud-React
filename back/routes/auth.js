const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Relacionamento: uma tarefa pertence a um usuário
Task.belongsTo(User);
// Um usuário pode ter muitas tarefas
User.hasMany(Task);

module.exports = Task;
