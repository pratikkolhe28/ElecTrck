import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Parties from './pages/Parties'
import Elections from './pages/Elections'
import Promises from './pages/Promises'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parties" element={<Parties />} />
        <Route path="/elections" element={<Elections />} />
        <Route path="/promises" element={<Promises />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App