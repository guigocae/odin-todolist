import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home.jsx'
import './App.css'

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
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/tarefas' element={<Tasks />} />
      </Routes>
    </>
  )
}

export default App
