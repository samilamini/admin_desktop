import './StatCard.css';

export default function StatCard({ title, value, color, icon }) {
  return (
    <div className="stat-card" style={{ borderLeft: `5px solid ${color}` }}>
      <div className="stat-card-content">
        <div className="stat-text">
          <p className="stat-title">{title}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div className="stat-icon" style={{ color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
}