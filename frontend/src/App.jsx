import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Parties from './pages/Parties'
import Elections from './pages/Elections'
import Promises from './pages/Promises'
import Login from './pages/Login'
import RegisterCitizen from './pages/RegisterCitizen'
import RegisterParty from './pages/RegisterParty'
import Vote from './pages/Vote'
import Results from './pages/Results'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parties" element={<Parties />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/promises" element={<Promises />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/citizen" element={<RegisterCitizen />} />
          <Route path="/register/party" element={<RegisterParty />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App