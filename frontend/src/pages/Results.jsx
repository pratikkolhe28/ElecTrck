import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

function Results() {
  const [results, setResults] = useState([])
  const [totalVotes, setTotalVotes] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
    const interval = setInterval(fetchResults, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchResults = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vote/results')
      const data = await res.json()
      setResults(data.results)
      setTotalVotes(data.totalVotes)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        backgroundColor: '#16213e',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <p style={{ color: 'white' }}>Loading results...</p>
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
        Live Results
      </h1>
      <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '8px' }}>
        Results update every 5 seconds automatically
      </p>
      <p style={{ color: '#e94560', textAlign: 'center', marginBottom: '40px', fontSize: '20px', fontWeight: '500' }}>
        Total Votes Cast: {totalVotes}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        maxWidth: '900px',
        margin: '0 auto 50px'
      }}>
        {results.map((party) => (
          <div key={party.partyId} style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            textAlign: 'center',
            borderTop: `4px solid ${party.color}`
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: party.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '16px',
              margin: '0 auto 12px'
            }}>
              {party.shortName}
            </div>
            <h3 style={{ color: 'white', margin: '0 0 8px', fontSize: '14px' }}>
              {party.name}
            </h3>
            <p style={{ color: party.color, fontSize: '32px', fontWeight: '700', margin: '0' }}>
              {party.votes}
            </p>
            <p style={{ color: '#a8a8b3', fontSize: '13px', margin: '4px 0 0' }}>
              {totalVotes > 0 ? ((party.votes / totalVotes) * 100).toFixed(1) : 0}%
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
        Vote Share
      </h2>
      <div style={{ maxWidth: '900px', margin: '0 auto 50px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={results}>
            <XAxis dataKey="shortName" stroke="#a8a8b3" />
            <YAxis stroke="#a8a8b3" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', color: 'white' }}
            />
            <Bar dataKey="votes" radius={[6, 6, 0, 0]}>
              {results.map((entry) => (
                <Cell key={entry.partyId} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
        Percentage Breakdown
      </h2>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={results}
              dataKey="votes"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(1)}%`
              }
            >
              {results.map((entry) => (
                <Cell key={entry.partyId} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', color: 'white' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Results