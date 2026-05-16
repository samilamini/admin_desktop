import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import StatCard from './components/StatCard/StatCard';
import SignalementsTable from './components/SignalementsTable/SignalementsTable';
import StatusChart from './components/StatusChart/StatusChart';
import {
  SignalementsByType, SignalementsByRegion,
  EvolutionMensuelle, ResumePerformances
} from './components/StatusChart/StatusChart';
import Signalements from './components/Signalements/Signalements';
import Carte from './components/Carte/Carte';
import Utilisateurs from './components/Utilisateurs/Utilisateurs';
import Rapports from './components/Rapports/Rapports';
import {
  AlertTriangle, ClipboardList, Clock, Star,
  Bell, Calendar, PanelLeft, MapPin, TrendingUp, Globe
} from 'lucide-react';
import './App.css';
import { useLang } from './context/LanguageContext.jsx';
import t from './translations.json';

const langOptions = ['fr', 'en', 'ar'];
const getLanguageLabel = (code) => t.languages?.[code]?.name ?? code;

function PageDashboard() {
  return (
    <>
      <div className="stat-cards">
        <StatCard titleKey="totalSignalements"        value="1 284" color="#e63946" icon={<AlertTriangle size={20}/>} />
        <StatCard titleKey="resolus"                   value="821"   color="#2d6a4f" icon={<ClipboardList size={20}/>} />
        <StatCard titleKey="enAttente"                value="347"   color="#f4a261" icon={<Clock size={20}/>} />
        <StatCard titleKey="enCours"                  value="137"   color="#457b9d" icon={<Star size={20}/>} />
      </div>
      <div className="dashboard-grid">
        <div className="grid-left"><SignalementsTable /></div>
        <div className="grid-right"><StatusChart /></div>
      </div>
    </>
  );
}

function PageStatistiques() {
  const { lang } = useLang();
  const months = t.common.months[lang];

  return (
    <>
      <div className="filters-row">
        <select className="filter-select">
          <option>{t.signalements.dropdowns.allRegions[lang]}</option>
          <option>{t.signalements.regions.babEzzouar[lang]}</option>
          <option>{t.signalements.regions.elHarrach[lang]}</option>
        </select>
        <select className="filter-select">
          <option>{t.signalements.dropdowns.allTypes[lang]}</option>
          <option>{t.signalements.problemTypes.coupureReseau[lang]}</option>
          <option>{t.signalements.problemTypes.faibleSignal[lang]}</option>
        </select>
        <select className="filter-select">
          <option>{months[3]}</option>
          <option>{months[2]}</option>
          <option>{months[1]}</option>
        </select>
        <select className="filter-select">
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>
      <div className="stat-cards">
        <StatCard titleKey="signalementsMois"      value="1,862"  color="#fb8c00" icon={<AlertTriangle size={20}/>} />
        <StatCard titleKey="tauxResolution"        value="312"    color="#1a6b3a" icon={<TrendingUp size={20}/>} />
        <StatCard titleKey="tempsMoy"             value="2h45mn" color="#f9a825" icon={<Clock size={20}/>} />
        <StatCard titleKey="zonesCritiques"        value="3"      color="#e53935" icon={<MapPin size={20}/>} />
      </div>
      <div className="charts-row">
        <SignalementsByType />
        <SignalementsByRegion />
      </div>
      <div className="bottom-row">
        <EvolutionMensuelle />
        <ResumePerformances />
      </div>
    </>
  );
}

function AppContent() {
  const { lang, setLang } = useLang();
  const [activeNav, setActiveNav]     = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 900px)');
    const handleResize = (event) => setSidebarOpen(event.matches);
    handleResize(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize);
      return () => mediaQuery.removeEventListener('change', handleResize);
    }
    mediaQuery.addListener(handleResize);
    return () => mediaQuery.removeListener(handleResize);
  }, []);

  const titles = {
    dashboard:    { title: t.sidebar.dashboard[lang],    sub: t.dashboard.pageSubtitle[lang] },
    signalements: { title: t.sidebar.signalements[lang], sub: t.signalements.pageSubtitle[lang] },
    statistiques: { title: t.sidebar.statistiques[lang], sub: t.statistiques.pageSubtitle[lang] },
    carte:        { title: t.sidebar.carte[lang],        sub: t.carte.pageSubtitle[lang] },
    users:        { title: t.sidebar.utilisateurs[lang], sub: t.utilisateurs.pageSubtitle[lang] },
    rapports:     { title: t.sidebar.rapports[lang],     sub: t.rapports.pageSubtitle[lang] },
  };

  const current = titles[activeNav] || titles.dashboard;

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {sidebarOpen && (
        <Sidebar activeItem={activeNav} onNavigate={setActiveNav} />
      )}
      {sidebarOpen && (
        <div className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="main-content">
        <div className="top-navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <PanelLeft size={20} color="#555" />
            </button>
            <div>
              <h2>{current.title}</h2>
              <p>{current.sub}</p>
            </div>
          </div>
          <div className="navbar-right">
            <Bell size={18} className="navbar-icon" />
            <Calendar size={18} className="navbar-icon" />

            <div className="lang-dropdown-wrap-navbar">
              <button
                className="lang-dropdown-btn-navbar"
                onClick={() => setDropdownOpen(o => !o)}
              >
                <Globe size={18} />
              </button>
              {dropdownOpen && (
                <div className="lang-dropdown-menu-navbar">
                  {langOptions.map(code => (
                    <button
                      key={code}
                      className={`lang-dropdown-item-navbar ${lang === code ? 'active' : ''}`}
                      onClick={() => { setLang(code); setDropdownOpen(false); }}
                    >
                      {getLanguageLabel(code)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="page-content">
          {activeNav === 'dashboard'    && <PageDashboard />}
          {activeNav === 'statistiques' && <PageStatistiques />}
          {activeNav === 'signalements' && <Signalements />}
          {activeNav === 'carte'        && <Carte />}
          {activeNav === 'users'        && <Utilisateurs />}
          {activeNav === 'rapports'     && <Rapports />}
          {!['dashboard', 'statistiques', 'signalements', 'carte', 'users', 'rapports'].includes(activeNav) && (
            <div className="page-placeholder">
              <p>{t.common.sectionMissing[lang].replace('{name}', current.title)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}