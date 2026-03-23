import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      login(data.user, data.token)

      if (data.user.role === 'admin') navigate('/admin')
      else if (data.user.role === 'party') navigate('/party-dashboard')
      else navigate('/vote')

    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px'
      }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
          Welcome Back
        </h2>
        <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
          Login to ElecTrack
        </p>

        {error && (
          <div style={{
            backgroundColor: '#e9456020',
            border: '1px solid #e94560',
            color: '#e94560',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#a8a8b3', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#16213e',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={{ color: '#a8a8b3', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#16213e',
                border: '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#e94560',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#a8a8b3', fontSize: '14px' }}>
            New citizen?{' '}
            <Link to="/register/citizen" style={{ color: '#e94560' }}>
              Register with Aadhaar
            </Link>
          </p>
          <p style={{ color: '#a8a8b3', fontSize: '14px', marginTop: '8px' }}>
            Register a party?{' '}
            <Link to="/register/party" style={{ color: '#e94560' }}>
              Party Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login