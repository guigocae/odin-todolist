import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'

function Tasks() {
  return <h1>Tarefas</h1>
}

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tarefas">Tarefas</Link>
      </nav>
      <div id="content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/tarefas' element={<Tasks />} />
        </Routes>
      </div>
    </>
  )
}

export default App
