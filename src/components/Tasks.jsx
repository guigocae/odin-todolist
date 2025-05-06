import { LocalStorage } from "./TaskRegistry";

const priorityImages = {
    low: "/green-flag.png",
    medium: "/yellow-flag.png",
    high: "/red-flag.png",
}

function Task({ id, title, description, dateLimit, priority, done }) {
    const prioritySource = priorityImages[priority];

    return (
        <div id={id} className="task-item" >
            <div className="top-card">
                <h3>{title}</h3>
                <div className="priority-image"><img src={prioritySource} /></div>
            </div>
            
            <p>{description}</p>
            <p>{dateLimit}</p>
            {done && <p>Concluida</p>}
        </div>
    )
}

function Tasks() {
  const nowTasks = LocalStorage.getAllTasks();

  return (
    nowTasks.map((task) => (
        <Task 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          description={task.description} 
          dateLimit={task.dateLimit} 
          priority={task.priority} 
          done={task.done} 
        />
    ))
  )
}

export default Tasks;