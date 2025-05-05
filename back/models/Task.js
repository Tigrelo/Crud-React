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

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
