import { LocalStorage } from "../main";
import { useState } from "react";

const priorityImages = {
  low: "/green-flag.png",
  medium: "/yellow-flag.png",
  high: "/red-flag.png",
};

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button onClick={onClose} className="closeBtn">Fechar</button>
        {children}
      </div>
    </div>
  );
}

function Task({ task, onClick }) {
  const prioritySource = priorityImages[task.priority];

  return (
    <div className="task-item" onClick={() => onClick(task)}>
      <div className="top-card">
        <h3>{task.title}</h3>
        <div className="priority-image"><img src={prioritySource} /></div>
      </div>
      <p>{task.description}</p>
      <p>{task.dateLimit}</p>
      {task.done && <p>Concluída</p>}
    </div>
  );
}

function Tasks() {
  const [modalAberto, setModalAberto] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const nowTasks = LocalStorage.getAllTasks();

  const openModal = (task) => {
    setSelectedTask(task);
    setModalAberto(true);
  };

  const removeTask = (selected) => {
    LocalStorage.removeTask(selected.id);
    setModalAberto(false);
  }

  return (
    <>
      {nowTasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onClick={openModal}
        />
      ))}

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        {selectedTask ? (
          <>
            <h2>{selectedTask.title}</h2>
            <p>{selectedTask.description}</p>
            <p>Prazo: {selectedTask.dateLimit}</p>
            <p>Prioridade: {selectedTask.priority}</p>
            {selectedTask.done && <p>Status: Concluída</p>}
            <button onClick={() => removeTask(selectedTask)}>Excluir</button>
          </>
        ) : (
          <p>Carregando tarefa...</p>
        )}
      </Modal>
    </>
  );
}

export default Tasks;