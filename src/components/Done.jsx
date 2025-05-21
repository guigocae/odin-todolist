import { LocalStorage, animateCSS } from "../main";
import { Task } from "./Tasks";

export default function Done() {
    const allTasks = LocalStorage.getAllTasks();
    const doneTasks = allTasks.filter((task) => task.done);

    animateCSS("#content", "fadeIn");
  
    return (
        <>
            <h1>Concluídas</h1>
             {doneTasks.length === 0 && <p>Não há tarefas concluídas</p>}
            {doneTasks.map((task) => (
                <Task 
                    key={task.id}
                    task={task}
                />
            ))}
        </>
    )
}