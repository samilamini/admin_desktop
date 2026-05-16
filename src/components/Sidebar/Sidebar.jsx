import { LayoutDashboard, AlertTriangle, BarChart2, Map, Users, FileText, LogOut, User } from 'lucide-react';
import mobilisLogo from '../../assets/Mobilis_Logo_white.svg';
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
        <img src={mobilisLogo} alt="Mobilis" className="logo-img" />
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

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <User size={16} color="#1b6b3a" />
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Admin</div>
            <div className="sidebar-user-role">Administrateur</div>
          </div>
          <button className="sidebar-logout-icon">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}