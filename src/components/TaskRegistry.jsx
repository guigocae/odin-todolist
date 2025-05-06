import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export class LocalStorage {
  static addTask(title, description, dateLimit, priority) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      dateLimit,
      priority,
      done: false,
    }

    const savedTasks = this.getAllTasks();
    savedTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
  }

  static removeTask(id) {
    const tasks = this.getAllTasks();
    const updatedTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  static markAsDone(id) {
    const tasks = this.getAllTasks();
    const updateTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  }

  static getAllTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
}


function TaskRegistry({ handleState }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimit, setDateLimit] = useState('');
  const [priority, setPriority] = useState('');

//   const [registrado, setRegistrado] = useState(false);
  const [erro, setErro] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    // setRegistrado(false);

    if (!title.trim()) errors.title = true;
    if (!description.trim()) errors.description = true;
    if (!dateLimit) errors.dateLimit = true;
    if (!priority) errors.priority = true;

    setErro(errors);
    setTimeout(() => {
      setErro({})
    }, 1000);

    if(Object.keys(errors).length === 0) {

        // setRegistrado(true);
        LocalStorage.addTask(title, description, dateLimit, priority);
        handleState(false);

        setTitle('');
        setDescription('');
        setDateLimit('');
        setPriority('');
        setErro('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
            <label htmlFor="title">Qual o título da tarefa?</label>
            <input 
              type="text" 
              id="title" 
              className={erro.title ? "border-red" : ""}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        {title && (
          <div className="form-item">
            <label htmlFor="description">Qual a descrição da tarefa?</label>
            <input 
              type="text" 
              id="description" 
              className={erro.description ? "border-red" : ""}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}
        {title && description && (
          <div className="form-item">
              <label htmlFor="date-limit">Qual a data limite?</label>
              <input 
                type="date" 
                id="date-limit"
                className={erro.dateLimit ? "border-red" : ""}
                value={dateLimit}
                onChange={(e) => setDateLimit(e.target.value)}
              />
          </div>
        )}
        {title && description && dateLimit && (
          <div className="form-item">
              <label htmlFor="priority">Qual a prioridade?</label>
              <select 
                id="priority"
                className={erro.priority ? "border-red" : ""}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                  <option value="" disabled hidden>--- Selecione ---</option>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
              </select>
          </div>
        )}
        <button type='submit'>Enviar</button>

        {/* {registrado && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            ✅ Registrado com sucesso!
          </p>
        )} */}
      </form>
    </>
  )
}

export default TaskRegistry;