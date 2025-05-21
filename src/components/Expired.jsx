import { LocalStorage, animateCSS } from "../main";
import { compareAsc } from 'date-fns';
import { Task } from "./Tasks";

export default function Expired() {
    const allTasks = LocalStorage.getAllTasks();
    const expiredTasks = allTasks.filter((task) => {
        const [year, month, day] = task.dateLimit.split('-').map(Number);
        const taskDate = new Date(year, month - 1, day);
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);
        taskDate.setHours(0, 0, 0, 0);
      
        return compareAsc(today, taskDate) > 0;
      });

      animateCSS("#content", "fadeIn");
  
    return (
        <>
            <h1>Expiradas</h1>
            {expiredTasks.length === 0 && <p>Não há tarefas expiradas</p>}
            {expiredTasks.sort((a, b) => compareAsc(a.dateLimit, b.dateLimit)).map((task) => (
                <Task 
                    key={task.id}
                    task={task}
                />
            ))}
        </>
    )
}