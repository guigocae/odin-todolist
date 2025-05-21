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
      t.id === id ? { ...t, done: !t.done } : t
    );
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  }

  static getAllTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  }
}

export const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });