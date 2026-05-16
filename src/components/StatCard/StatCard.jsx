import './StatCard.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

export default function StatCard({ titleKey, value, color, icon }) {
  const { lang } = useLang();
  const title = t.dashboard.statCards[titleKey]?.[lang]
    ?? t.statistiques?.statCards?.[titleKey]?.[lang]
    ?? titleKey;

  return (
    <div className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="stat-card-content">
        <div className="stat-text">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className="stat-icon" style={{ color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}