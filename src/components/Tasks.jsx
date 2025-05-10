import { LocalStorage } from "../main";
import TaskRegistry from "./TaskRegistry";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
  const [year, month, day] = task.dateLimit.split('-').map(Number);

  return (
    <div className="task-item" onClick={() => onClick(task)}>
      <div className="top-card">
        <h3>{task.title}</h3>
        <div className="priority-image"><img src={prioritySource} /></div>
      </div>
      <p>{task.description}</p>
      <p>{format(new Date(year, month-1, day), "dd/MM/yyy")}</p>
      {task.done && <p>Concluída</p>}
    </div>
  );
}

function Tasks() {
  const [modalAberto, setModalAberto] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [editTask, setEditTask] = useState(false);

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

      <Modal isOpen={modalAberto} onClose={() => {setModalAberto(false); setEditTask(false)}}>
        {selectedTask ? (
          <>
            {!editTask && 
              (() => {
                const [year, month, day] = selectedTask.dateLimit.split('-').map(Number);
                return (
                  <> 
                    <h2>{selectedTask.title}</h2>
                    <p>{selectedTask.description}</p>
                    <p>Prazo: {format(new Date(year, month-1, day), "dd/MM/yyy")}</p>
                    <p>Prioridade: {selectedTask.priority}</p>
                    {selectedTask.done && <p>Status: Concluída</p>}
                  </>
                ) 
              })()
            }
            {editTask ? 
              <TaskRegistry 
                _title={selectedTask.title} 
                _description={selectedTask.description} 
                _dateLimit={selectedTask.dateLimit} 
                _priority={selectedTask.priority}
                id={selectedTask.id}
                onClose={() => {setModalAberto(false); setEditTask(false)}}
              /> :
              <div className="footer-modal">
                <button onClick={() => setEditTask(true)}>Editar</button>
                <button onClick={() => removeTask(selectedTask)}>Excluir</button>
              </div>
            }
          </>
        ) : (
          <p>Carregando tarefa...</p>
        )}
      </Modal>
    </>
  );
}

export default Tasks;