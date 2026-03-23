import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('Connecting...')

  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Backend not connected'))
  }, [])

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>ElecTrack</h1>
      <p>{message}</p>
    </div>
  )
}

export default App