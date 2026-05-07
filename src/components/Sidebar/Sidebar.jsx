import { LayoutDashboard, AlertTriangle, BarChart2, Map, Users, FileText } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { icon: <LayoutDashboard size={16}/>, label: 'Tableau de bord', id: 'dashboard' },
  { icon: <AlertTriangle size={16}/>,   label: 'Signalements',    id: 'signalements' },
  { icon: <BarChart2 size={16}/>,       label: 'Statistiques',    id: 'statistiques' },
  { icon: <Map size={16}/>,             label: 'Carte',            id: 'carte' },
];

const gestionItems = [
  { icon: <Users size={16}/>,    label: 'Utilisateurs', id: 'users' },
  { icon: <FileText size={16}/>, label: 'Rapports',     id: 'rapports' },
];

export default function Sidebar({ activeItem, onNavigate }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-arabic">موبيليس</div>
        <div className="logo-text">mobilis</div>
      </div>

      <div className="sidebar-nav">
        <p className="nav-title">Navigation</p>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}

        <p className="nav-title">Gestion</p>
        {gestionItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}