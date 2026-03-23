import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '15px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ color: '#e94560', margin: 0 }}>ElecTrack</h2>
      <div style={{ display: 'flex', gap: '30px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/parties" style={{ color: 'white', textDecoration: 'none' }}>Parties</Link>
        <Link to="/elections" style={{ color: 'white', textDecoration: 'none' }}>Elections</Link>
        <Link to="/promises" style={{ color: 'white', textDecoration: 'none' }}>Promises</Link>
      </div>
    </nav>
  )
}

export default Navbar