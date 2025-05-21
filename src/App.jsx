import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import Expired from './components/Expired.jsx'
import Done from './components/Done.jsx'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/tarefas">Expiradas</Link>
        <Link to="/concluidas">Concluídas</Link>
      </nav>
      <div id="content">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path='/tarefas' element={<Expired />} />
          <Route path='/concluidas' element={<Done />} />
        </Routes>
      </div>
    </>
  )
}

export default App
