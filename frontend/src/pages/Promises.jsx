const promisesData = [
  { id: 1, party: 'BJP', promise: 'Build Ram Mandir in Ayodhya', status: 'kept', year: '2019' },
  { id: 2, party: 'BJP', promise: 'Provide 2 crore jobs per year', status: 'broken', year: '2014' },
  { id: 3, party: 'INC', promise: 'Implement NYAY scheme — Rs 72000/year to poor', status: 'broken', year: '2019' },
  { id: 4, party: 'AAP', promise: 'Free electricity up to 200 units in Delhi', status: 'kept', year: '2020' },
  { id: 5, party: 'AAP', promise: 'Build 20 new govt colleges in Delhi', status: 'pending', year: '2020' },
  { id: 6, party: 'INC', promise: 'Waive farmer loans within 10 days', status: 'kept', year: '2018' },
]

const statusColor = {
  kept: '#00C49F',
  broken: '#e94560',
  pending: '#FFBB28'
}

const statusLabel = {
  kept: 'Kept',
  broken: 'Broken',
  pending: 'Pending'
}

function Promises() {
  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      padding: '40px'
    }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
        Promises Tracker
      </h1>
      <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '40px' }}>
        Holding parties accountable — promise by promise
      </p>

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        {[
          { label: 'Kept', color: '#00C49F' },
          { label: 'Broken', color: '#e94560' },
          { label: 'Pending', color: '#FFBB28' },
        ].map(s => (
          <div key={s.label} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white',
            fontSize: '14px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: s.color
            }} />
            {s.label}
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {promisesData.map(p => (
          <div key={p.id} style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '20px 24px',
            borderLeft: `4px solid ${statusColor[p.status]}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: '#16213e',
                  color: '#a8a8b3',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>{p.party}</span>
                <span style={{
                  backgroundColor: '#16213e',
                  color: '#a8a8b3',
                  padding: '2px 10px',
                  borderRadius: '20px',
                  fontSize: '12px'
                }}>{p.year}</span>
              </div>
              <p style={{ color: 'white', margin: 0, fontSize: '15px' }}>{p.promise}</p>
            </div>
            <div style={{
              backgroundColor: statusColor[p.status],
              color: '#16213e',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              marginLeft: '20px'
            }}>
              {statusLabel[p.status]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Promises