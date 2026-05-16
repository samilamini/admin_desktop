import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './StatusChart.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

const zones = [
  { nameKey: 'babEzzouar',  val: 218 },
  { nameKey: 'elHarrach',   val: 184 },
  { nameKey: 'sidiMhamed', val: 153 },
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

const typeData = [
  { labelKey: 'coupureReseau',    value: 314 },
  { labelKey: 'faibleDebit',      value: 248 },
  { labelKey: 'congestion',       value: 180 },
  { labelKey: 'lenteurConnexion', value: 141 },
  { labelKey: 'absenceCouverture',value: 88  },
  { labelKey: 'autres',           value: 31  },
];

const regionData = [
  { nameKey: 'babEzzouar',  value: 218, color: '#e53935' },
  { nameKey: 'elHarrach',   value: 184, color: '#e53935' },
  { nameKey: 'sidiMhamed', value: 153, color: '#fb8c00' },
  { nameKey: 'darElBeida', value: 128, color: '#fdd835' },
  { nameKey: 'algerCentre', value: 102, color: '#1a6b3a' },
  { nameKey: 'kouba',        value: 40,  color: '#1a6b3a' },
];

const resumeKeys = ['signalTraites', 'moyParJour', 'usersSignale'];
const resumeValues = ['1325', '45', '289'];

const CustomTooltip = ({ active, payload, label, lang }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#1a2332', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12 }}>
        <p style={{ fontWeight: 700, marginBottom: 2 }}>{label}</p>
        <p>{payload[0].value.toLocaleString()} {t.statistiques.evolution.tooltip[lang]}</p>
      </div>
    );
  }
  return null;
};

export default function StatusChart() {
  const { lang } = useLang();
  const s = t.statistiques;

  const pieData = [
    { name: s.globalStatus.resolus[lang],   value: 64, color: '#2d6a4f' },
    { name: s.globalStatus.enCours[lang],   value: 21, color: '#f4a261' },
    { name: s.globalStatus.enAttente[lang], value: 15, color: '#e63946' },
  ];

  return (
    <div className="chart-wrapper">
      <div className="chart-card">
        <h3>{s.globalStatus.title[lang]}</h3>
        <div className="pie-container">
          <PieChart width={160} height={130}>
            <Pie data={pieData} cx={80} cy={65} innerRadius={38} outerRadius={60} dataKey="value">
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </div>
        <div className="legend">
          {pieData.map(item => (
            <div key={item.name} className="legend-item">
              <span className="legend-dot" style={{ background: item.color }} />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-card">
        <h3>{s.topZones.title[lang]}</h3>
        <div className="zones">
          {zones.map(z => {
            const zoneLabel = t.signalements.regions[z.nameKey]?.[lang] ?? z.nameKey;
            return (
              <div key={z.nameKey} className="zone-item">
                <div className="zone-label">
                  <span>{zoneLabel}</span>
                  <span>{z.val}</span>
                </div>
                <div className="zone-bar-bg">
                  <div className="zone-bar-fill" style={{ width: `${(z.val / 218) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SignalementsByType() {
  const { lang } = useLang();
  const s = t.statistiques.byType;
  return (
    <div className="chart-card-ui2">
      <h3>{s.title[lang]}</h3>
      <div className="bar-list">
        {typeData.map(({ labelKey, value }) => (
          <div key={labelKey} className="bar-row">
            <span className="bar-label">{s[labelKey][lang]}</span>
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
  const { lang } = useLang();
  const s = t.statistiques.byRegion;
  return (
    <div className="chart-card-ui2">
      <h3>{s.title[lang]}</h3>
      <div className="bar-list">
        {regionData.map(({ nameKey, value, color }) => {
          const regionLabel = t.signalements.regions[nameKey]?.[lang] ?? nameKey;
          return (
            <div key={nameKey} className="bar-row">
              <span className="bar-label region">{regionLabel}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(value / 218) * 100}%`, background: color }} />
              </div>
              <span className="bar-count">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function EvolutionMensuelle() {
  const { lang } = useLang();
  return (
    <div className="evolution-card">
      <h3>{t.statistiques.evolution.title[lang]}</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={evolutionData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eef1f5" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#9aa5b4' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: '#9aa5b4' }} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}K`} />
          <Tooltip content={<CustomTooltip lang={lang} />} />
          <Line type="monotone" dataKey="value" stroke="#1b6b3a" strokeWidth={2.5}
            dot={{ r: 4, fill: '#1b6b3a', strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ResumePerformances() {
  const { lang } = useLang();
  const r = t.statistiques.resume;
  return (
    <div className="resume-card">
      <h3>{r.title[lang]}</h3>
      {resumeKeys.map((key, i) => (
        <div key={key} className="resume-row">
          <span className="resume-row-label">{r[key][lang]}</span>
          <span className="resume-row-value">{resumeValues[i]}</span>
        </div>
      ))}
    </div>
  );
}