const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await Task.create({ title, description, UserId: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar tarefa' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { UserId: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await Task.findOne({ where: { id, UserId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    await task.update({ title, description, completed });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar tarefa' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ where: { id, UserId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });

    await task.destroy();
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir tarefa' });
  }
};
