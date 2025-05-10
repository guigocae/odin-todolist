import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import App from './App.jsx'
import './assets/css/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

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
    return newTask.id;
  }

  static removeTask(id) {
    const tasks = this.getAllTasks();
    const updatedTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  static selectTask(id) {
    const savedTasks = this.getAllTasks();
    const selectedItem = savedTasks.filter((item) => item.id === id);
    return selectedItem[0];
  }

  static editTask(id, title, description, dateLimit, priority) {
    this.removeTask(id);
    return this.addTask(title, description, dateLimit, priority);
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