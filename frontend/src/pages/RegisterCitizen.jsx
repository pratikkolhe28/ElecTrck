import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RegisterCitizen() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', aadhaarNumber: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.aadhaarNumber.length !== 12) {
      setError('Aadhaar number must be exactly 12 digits')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register/citizen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setLoading(false)
        return
      }

      login(data.user, data.token)
      navigate('/vote')

    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#16213e',
    border: '1px solid #333',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#a8a8b3',
    fontSize: '14px',
    display: 'block',
    marginBottom: '8px'
  }

  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '420px'
      }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
          Citizen Registration
        </h2>
        <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
          Register using your Aadhaar number
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Full Name</label>
            <input name="name" type="text" value={form.name}
              onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email}
              onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Password</label>
            <input name="password" type="password" value={form.password}
              onChange={handleChange} required style={inputStyle} />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label style={labelStyle}>Aadhaar Number (12 digits)</label>
            <input name="aadhaarNumber" type="text" value={form.aadhaarNumber}
              onChange={handleChange} required maxLength={12} style={inputStyle}
              placeholder="Enter 12 digit Aadhaar number" />
          </div>

          <button type="submit" disabled={loading} style={{
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
          }}>
            {loading ? 'Registering...' : 'Register as Citizen'}
          </button>
        </form>

        <p style={{ color: '#a8a8b3', fontSize: '14px', textAlign: 'center', marginTop: '24px' }}>
          Already registered?{' '}
          <Link to="/login" style={{ color: '#e94560' }}>Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterCitizen