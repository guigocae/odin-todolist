import { useState } from "react";
import TaskRegistry from "./TaskRegistry";
import Tasks from "./Tasks";
import '../assets/css/Home.css';

function Home() {
  const [register, setRegister] = useState(false);

  const toggleTask = () => {
    setRegister(true);
  }

  return (
    <>
      <Tasks />
      {register ? <TaskRegistry handleState={setRegister} /> : (
        <button onClick={toggleTask}>Adicionar Tarefa</button>
      )}
    </>
  )
}

export default Home;