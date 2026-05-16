import { LayoutDashboard, AlertTriangle, BarChart2, Map, Users, FileText, LogOut, User } from 'lucide-react';
import mobilisLogo from '../../assets/Mobilis_Logo_white.svg';
import './Sidebar.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

const navItems = [
  { icon: <LayoutDashboard size={16}/>, labelKey: 'dashboard',    id: 'dashboard'    },
  { icon: <AlertTriangle size={16}/>,   labelKey: 'signalements', id: 'signalements' },
  { icon: <BarChart2 size={16}/>,       labelKey: 'statistiques', id: 'statistiques' },
  { icon: <Map size={16}/>,             labelKey: 'carte',        id: 'carte'        },
];

const gestionItems = [
  { icon: <Users size={16}/>,    labelKey: 'utilisateurs', id: 'users'    },
  { icon: <FileText size={16}/>, labelKey: 'rapports',     id: 'rapports' },
];

export default function Sidebar({ activeItem, onNavigate, onLogout }) {
  const { lang } = useLang();
  const s = t.sidebar;

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={mobilisLogo} alt="Mobilis" className="logo-img" />
      </div>

      <div className="sidebar-nav">
        <p className="nav-title">{s.navTitle[lang]}</p>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            {item.icon}
            <span>{s[item.labelKey][lang]}</span>
          </div>
        ))}

        <p className="nav-title">{s.gestionTitle[lang]}</p>
        {gestionItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onNavigate && onNavigate(item.id)}
          >
            {item.icon}
            <span>{s[item.labelKey][lang]}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <User size={16} color="#1b6b3a" />
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{s.adminName?.[lang] ?? 'Admin'}</div>
            <div className="sidebar-user-role">{s.adminRole?.[lang] ?? 'Administrateur'}</div>
          </div>
          <button className="sidebar-logout-icon" onClick={() => onLogout && onLogout()}>
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}