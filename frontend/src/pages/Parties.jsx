const partiesData = [
  { name: 'Bharatiya Janata Party', short: 'BJP', color: '#FF9933', founded: '1980', ideology: 'National Conservatism' },
  { name: 'Indian National Congress', short: 'INC', color: '#00BFFF', founded: '1885', ideology: 'Social Democracy' },
  { name: 'Aam Aadmi Party', short: 'AAP', color: '#00BFAF', founded: '2012', ideology: 'Anti-corruption' },
  { name: 'Shiv Sena', short: 'SS', color: '#FF6600', founded: '1966', ideology: 'Hindu Nationalism' },
]

function Parties() {
  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      padding: '40px'
    }}>
      <h1 style={{
        color: 'white',
        textAlign: 'center',
        marginBottom: '10px'
      }}>
        Political Parties
      </h1>
      <p style={{
        color: '#a8a8b3',
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        Track parties, their promises and work done
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        {partiesData.map((party) => (
          <div key={party.short} style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '28px',
            borderTop: `4px solid ${party.color}`,
            cursor: 'pointer'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: party.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              marginBottom: '16px'
            }}>
              {party.short}
            </div>
            <h3 style={{ color: 'white', margin: '0 0 8px' }}>{party.name}</h3>
            <p style={{ color: '#a8a8b3', margin: '0 0 4px', fontSize: '14px' }}>Founded: {party.founded}</p>
            <p style={{ color: '#a8a8b3', margin: '0', fontSize: '14px' }}>Ideology: {party.ideology}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Parties