import { useEffect, useState } from 'react';
import api from '../services/api';
import ParticlesBackground from '../components/ParticlesBackground';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const loadTasks = async () => {
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/tasks/${editingId}`, form);
      setEditingId(null);
    } else {
      await api.post('/tasks', form);
    }
    setForm({ title: '', description: '' });
    loadTasks();
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditingId(task.id);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1, padding: 20 }}>
      <ParticlesBackground />
      <h2 style={{ color: 'white' }}>Tarefas</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? 'Atualizar' : 'Adicionar'}
        </button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(t => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <strong>{t.title}</strong> - {t.description}
            <button onClick={() => handleEdit(t)} style={{ marginLeft: 10 }}>
              Editar
            </button>
            <button onClick={() => handleDelete(t.id)} style={{ marginLeft: 5 }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
