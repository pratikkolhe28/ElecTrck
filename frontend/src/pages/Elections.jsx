import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const electionData = [
  { year: '2004', BJP: 138, INC: 145, Others: 280 },
  { year: '2009', BJP: 116, INC: 206, Others: 221 },
  { year: '2014', BJP: 282, INC: 44, Others: 217 },
  { year: '2019', BJP: 303, INC: 52, Others: 188 },
  { year: '2024', BJP: 240, INC: 99, Others: 204 },
]

const pieData2024 = [
  { name: 'BJP', value: 240, color: '#FF9933' },
  { name: 'INC', value: 99, color: '#00BFFF' },
  { name: 'Others', value: 204, color: '#a8a8b3' },
]

function Elections() {
  return (
    <div style={{
      backgroundColor: '#16213e',
      minHeight: '90vh',
      padding: '40px'
    }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '10px' }}>
        Election History
      </h1>
      <p style={{ color: '#a8a8b3', textAlign: 'center', marginBottom: '50px' }}>
        Lok Sabha results from 2004 to 2024
      </p>

      <h2 style={{ color: 'white', marginBottom: '20px', maxWidth: '900px', margin: '0 auto 20px' }}>
        Seats Won — All Elections
      </h2>
      <div style={{ maxWidth: '900px', margin: '0 auto 60px' }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={electionData}>
            <XAxis dataKey="year" stroke="#a8a8b3" />
            <YAxis stroke="#a8a8b3" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', color: 'white' }}
            />
            <Legend />
            <Bar dataKey="BJP" fill="#FF9933" radius={[4, 4, 0, 0]} />
            <Bar dataKey="INC" fill="#00BFFF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Others" fill="#a8a8b3" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ color: 'white', maxWidth: '900px', margin: '0 auto 20px' }}>
        2024 Seat Share
      </h2>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData2024}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData2024.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1a1a2e', border: 'none', color: 'white' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Elections