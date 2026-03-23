import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ color: '#e94560', margin: 0 }}>ElecTrack</h2>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/parties" style={{ color: 'white', textDecoration: 'none' }}>Parties</Link>
        <Link to="/elections" style={{ color: 'white', textDecoration: 'none' }}>Elections</Link>
        <Link to="/promises" style={{ color: 'white', textDecoration: 'none' }}>Promises</Link>
        {user && user.role === 'citizen' && (
        <Link to="/vote" style={{ color: 'white', textDecoration: 'none' }}>Vote</Link>
        )}
        <Link to="/results" style={{ color: 'white', textDecoration: 'none' }}>Results</Link>
        
        {user ? (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ color: '#a8a8b3', fontSize: '14px' }}>
              Hello, {user.name}
            </span>
            <button onClick={logout} style={{
              backgroundColor: 'transparent',
              color: '#e94560',
              border: '1px solid #e94560',
              padding: '6px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{
            backgroundColor: '#e94560',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '6px',
            textDecoration: 'none'
          }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar