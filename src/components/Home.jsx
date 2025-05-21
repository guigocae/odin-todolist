import { useState } from "react";
import { animateCSS } from "../main";
import TaskRegistry from "./TaskRegistry";
import Tasks from "./Tasks";
import '../assets/css/Home.css';

function Home() {
  const [register, setRegister] = useState(false);

  const toggleTask = () => {
    setRegister(true);
  }

  animateCSS("#content", "fadeIn");

  return (
    <>
      <Tasks />
      {register ? <TaskRegistry handleState={setRegister} /> : (
        <button onClick={toggleTask} className="botao-adicionar">Adicionar Tarefa</button>
      )}
    </>
  )
}

export default Home;