import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './StatusChart.css';

/* ══ UI 1 ════════════════════════════════════════════════ */
const pieData = [
  { name: 'Résolus — 64%',    value: 64, color: '#2d6a4f' },
  { name: 'En cours — 21%',   value: 21, color: '#f4a261' },
  { name: 'En attente — 15%', value: 15, color: '#e63946' },
];

const zones = [
  { zone: 'Bab Ezzouar',  val: 218 },
  { zone: 'El Harrach',   val: 184 },
  { zone: "Sidi M'Hamed", val: 153 },
];

export default function StatusChart() {
  return (
    <div className="chart-wrapper">
      <div className="chart-card">
        <h3>Statut Global</h3>
        <div className="pie-container">
          <PieChart width={160} height={130}>
            <Pie data={pieData} cx={80} cy={65} innerRadius={38} outerRadius={60} dataKey="value">
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </div>
        <div className="legend">
          {pieData.map((item) => (
            <div key={item.name} className="legend-item">
              <span className="legend-dot" style={{ background: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h3>Top 3 zones critiques</h3>
        <div className="zones">
          {zones.map((z) => (
            <div key={z.zone} className="zone-item">
              <div className="zone-label">
                <span>{z.zone}</span>
                <span>{z.val}</span>
              </div>
              <div className="zone-bar-bg">
                <div className="zone-bar-fill" style={{ width: `${(z.val / 218) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══ UI 2 ════════════════════════════════════════════════ */
const typeData = [
  { label: 'Coupure réseau',       value: 314 },
  { label: 'Faible débit',         value: 248 },
  { label: 'Congestion',           value: 180 },
  { label: 'Lenteur de connexion', value: 141 },
  { label: 'Absence couverture',   value: 88  },
  { label: 'Autres',               value: 31  },
];

const regionData = [
  { label: 'Bab Ezzouar',  value: 218, color: '#e53935' },
  { label: 'El Harrach',   value: 184, color: '#e53935' },
  { label: "Sidi M'Hamed", value: 153, color: '#fb8c00' },
  { label: 'Dar El Beïda', value: 128, color: '#fdd835' },
  { label: 'Alger-Centre', value: 102, color: '#1a6b3a' },
  { label: 'Kouba',        value: 40,  color: '#1a6b3a' },
];

const evolutionData = [
  { month: 'OCT 2025', value: 1200 },
  { month: 'NOV 2025', value: 1800 },
  { month: 'DEC 2025', value: 2400 },
  { month: 'JAN 2026', value: 1600 },
  { month: 'FEV 2026', value: 2800 },
  { month: 'MAR 2026', value: 3100 },
  { month: 'AVR 2026', value: 2900 },
];

const resumeData = [
  { label: 'Signalements traités',       value: '1325' },
  { label: 'Moy. signalements/jour',     value: '45'   },
  { label: 'Utilisateurs ayant signalé', value: '289'  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1a2332', color: '#fff',
        padding: '8px 14px', borderRadius: 8, fontSize: 12
      }}>
        <p style={{ fontWeight: 700, marginBottom: 2 }}>{label}</p>
        <p>{payload[0].value.toLocaleString()} signalements</p>
      </div>
    );
  }
  return null;
};

export function SignalementsByType() {
  return (
    <div className="chart-card-ui2">
      <h3>Signalements par types</h3>
      <div className="bar-list">
        {typeData.map(({ label, value }) => (
          <div key={label} className="bar-row">
            <span className="bar-label">{label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(value / 314) * 100}%`, background: '#1b6b3a' }} />
            </div>
            <span className="bar-count">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SignalementsByRegion() {
  return (
    <div className="chart-card-ui2">
      <h3>Signalements par region</h3>
      <div className="bar-list">
        {regionData.map(({ label, value, color }) => (
          <div key={label} className="bar-row">
            <span className="bar-label region">{label}</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${(value / 218) * 100}%`, background: color }} />
            </div>
            <span className="bar-count">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EvolutionMensuelle() {
  return (
    <div className="evolution-card">
      <h3>Évolution mensuelle</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={evolutionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9aa5b4' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#9aa5b4' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="value" stroke="#1b6b3a" strokeWidth={2.5}
            dot={{ r: 4, fill: '#1b6b3a', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResumePerformances() {
  return (
    <div className="resume-card">
      <h3>Résumé performances</h3>
      {resumeData.map(({ label, value }) => (
        <div key={label} className="resume-row">
          <span className="resume-row-label">{label}</span>
          <span className="resume-row-value">{value}</span>
        </div>
      ))}
    </div>
  );
}