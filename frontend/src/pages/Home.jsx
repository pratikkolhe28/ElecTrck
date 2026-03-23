function Home() {
  return (
    <div>
      <div style={{
        backgroundColor: '#16213e',
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px'
      }}>
        <h1 style={{
          color: '#e94560',
          fontSize: '52px',
          margin: '0 0 20px'
        }}>
          ElecTrack
        </h1>
        <p style={{
          color: '#a8a8b3',
          fontSize: '20px',
          maxWidth: '600px',
          lineHeight: '1.6',
          margin: '0 0 40px'
        }}>
          India's civic transparency platform. Track party promises,
          election history, and hold leaders accountable.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="/parties" style={{
            backgroundColor: '#e94560',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500'
          }}>
            View Parties
          </a>
          <a href="/elections" style={{
            backgroundColor: 'transparent',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            border: '1px solid white'
          }}>
            Election History
          </a>
        </div>

        <div style={{
          display: 'flex',
          gap: '40px',
          marginTop: '80px'
        }}>
          {[
            { number: '6+', label: 'Major Parties' },
            { number: '5', label: 'Elections Tracked' },
            { number: '100+', label: 'Promises Tracked' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <h2 style={{ color: '#e94560', fontSize: '36px', margin: '0' }}>{stat.number}</h2>
              <p style={{ color: '#a8a8b3', margin: '5px 0 0' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home