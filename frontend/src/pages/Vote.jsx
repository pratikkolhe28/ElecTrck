import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Vote() {
  const [parties, setParties] = useState([])
  const [selectedParty, setSelectedParty] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votedPartyName, setVotedPartyName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, token } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'citizen') {
      navigate('/login')
      return
    }
    fetchParties()
  }, [])

  const fetchParties = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vote/parties')
      const data = await res.json()
      setParties(data)
    } catch (err) {
      setError('Could not load parties. Try again.')
    }
  }

  const handleSelectParty = (party) => {
    setSelectedParty(party)
    setShowConfirm(true)
  }

  const handleConfirmVote = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('http://localhost:5000/api/vote/cast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ partyId: selectedParty._id })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        setShowConfirm(false)
        setLoading(false)
        return
      }

      setVoted(true)
      setVotedPartyName(selectedParty.name)
      setShowConfirm(false)

    } catch (err) {
      setError('Something went wrong. Try again.')
      setLoading(false)
    }
  }

  if (voted) {
    return (
      <div style={{
        backgroundColor: '#16213e',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#00C49F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          marginBottom: '24px'
        }}>
          ✓
        </div>
        <h1 style={{ color: 'white', marginBottom: '12px' }}>
          Vote Cast Successfully!
        </h1>
        <p style={{ color: '#a8a8b3', fontSize: '18px', marginBottom: '8px' }}>
          You voted for
        </p>
        <h2 style={{ color: '#00C49F', marginBottom: '24px' }}>
          {votedPartyName}
        </h2>
        <p style={{ color: '#a8a8b3', fontSize: '14px', marginBottom: '32px' }}>
          Your vote has been recorded securely. Thank you for participating!
        </p>
        <button
          onClick={() => navigate('/results')}
          style={{
            backgroundColor: '#e94560',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          View Live Results
        </button>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      padding: '40px'
    }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '8px' }}>
        Cast Your Vote
      </h1>
      <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '12px' }}>
        Welcome, {user?.name}
      </p>
      <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '40px', fontSize: '14px' }}>
        Select a party to vote for. This action cannot be undone.
      </p>

      {error && (
        <div style={{
          backgroundColor: '#e9456020',
          border: '1px solid #e94560',
          color: '#e94560',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          maxWidth: '800px',
          margin: '0 auto 20px',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {parties.map((party) => (
          <div
            key={party._id}
            onClick={() => handleSelectParty(party)}
            style={{
              backgroundColor: '#1a1a2e',
              borderRadius: '12px',
              padding: '32px 24px',
              borderTop: `4px solid ${party.color}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: party.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '20px',
              margin: '0 auto 16px'
            }}>
              {party.shortName}
            </div>
            <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '15px' }}>
              {party.name}
            </h3>
            <p style={{ color: '#a8a8b3', margin: '0', fontSize: '13px' }}>
              {party.ideology}
            </p>
            <div style={{
              marginTop: '20px',
              backgroundColor: party.color + '22',
              border: `1px solid ${party.color}`,
              color: party.color,
              padding: '8px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '500'
            }}>
              Vote for {party.shortName}
            </div>
          </div>
        ))}
      </div>

      {showConfirm && selectedParty && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            border: `2px solid ${selectedParty.color}`
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: selectedParty.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '20px',
              margin: '0 auto 20px'
            }}>
              {selectedParty.shortName}
            </div>
            <h2 style={{ color: 'white', marginBottom: '8px' }}>
              Confirm Your Vote
            </h2>
            <p style={{ color: '#a8a8b3', marginBottom: '8px' }}>
              You are about to vote for
            </p>
            <h3 style={{ color: selectedParty.color, marginBottom: '24px' }}>
              {selectedParty.name}
            </h3>
            <p style={{ color: '#e94560', fontSize: '13px', marginBottom: '28px' }}>
              This action cannot be undone. Are you sure?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmVote}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: selectedParty.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? 'Casting...' : 'Confirm Vote'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Vote