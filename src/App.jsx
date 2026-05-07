import { useState } from 'react';
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
import {
  AlertTriangle, ClipboardList, Clock, Star,
  Bell, Calendar, ChevronDown, Download,
  LayoutDashboard, MapPin, TrendingUp,
  Radio, BarChart2, Map, FileText, PanelLeft
} from 'lucide-react';
import './App.css';

function PageDashboard() {
  return (
    <>
      <div className="stat-cards">
        <StatCard title="Total signalements"        value="1 284" color="#e63946" icon={<AlertTriangle size={20}/>} />
        <StatCard title="Résolus"                   value="821"   color="#2d6a4f" icon={<ClipboardList size={20}/>} />
        <StatCard title="En attente"                value="347"   color="#f4a261" icon={<Clock size={20}/>} />
        <StatCard title="Utilisateurs en ce moment" value="137"   color="#457b9d" icon={<Star size={20}/>} />
      </div>
      <div className="dashboard-grid">
        <div className="grid-left"><SignalementsTable /></div>
        <div className="grid-right"><StatusChart /></div>
      </div>
    </>
  );
}

function PageStatistiques() {
  return (
    <>
      <div className="filters-row">
        <select className="filter-select"><option>toutes les regions</option><option>Alger</option><option>Oran</option></select>
        <select className="filter-select"><option>tous les types</option><option>Coupure réseau</option><option>Faible débit</option></select>
        <select className="filter-select"><option>Avril</option><option>Mars</option><option>Février</option></select>
        <select className="filter-select"><option>2025</option><option>2024</option></select>
        <button className="export-btn"><Download size={13} /> Export</button>
      </div>
      <div className="stat-cards">
        <StatCard title="Signalements ce mois"      value="1,862"  color="#fb8c00" icon={<AlertTriangle size={20}/>} />
        <StatCard title="Taux de résolution"        value="312"    color="#1a6b3a" icon={<TrendingUp size={20}/>} />
        <StatCard title="Temps moyen de résolution" value="2h45mn" color="#f9a825" icon={<Clock size={20}/>} />
        <StatCard title="Zones critiques"           value="3"      color="#e53935" icon={<MapPin size={20}/>} />
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

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const titles = {
    dashboard:    { title: 'Dashboard',    sub: 'Plateforme de gestion des signalements Mobilis', icon: <LayoutDashboard size={18} color="#1b6b3a" /> },
    signalements: { title: 'Signalements', sub: 'Liste des signalements',                         icon: <Radio size={18} color="#1b6b3a" /> },
    statistiques: { title: 'Statistiques', sub: 'Plateforme du gestion des signalements Mobilis', icon: <BarChart2 size={18} color="#1b6b3a" /> },
    carte:        { title: 'Carte',        sub: 'Carte des zones critiques',                      icon: <Map size={18} color="#1b6b3a" /> },
    users:        { title: 'Utilisateurs', sub: 'Gestion des utilisateurs',                       icon: null },
    rapports:     { title: 'Rapports',     sub: 'Rapports et exports',                            icon: <FileText size={18} color="#1b6b3a" /> },
  };

  const current = titles[activeNav] || titles.dashboard;

  return (
    <div className="app">
      {sidebarOpen && (
        <Sidebar activeItem={activeNav} onNavigate={setActiveNav} />
      )}

      <div className="main-content">
        <div className="top-navbar">
          <div className="navbar-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <PanelLeft size={20} color="#555" />
            </button>
            {current.icon && (
              <div className="navbar-icon-wrap">
                {current.icon}
              </div>
            )}
            <div>
              <h2>{current.title}</h2>
              <p>{current.sub}</p>
            </div>
          </div>
          <div className="navbar-right">
            <Bell size={18} className="navbar-icon" />
            <Calendar size={18} className="navbar-icon" />
            <div className="user-info">
              <div className="user-avatar" />
              <div>
                <div className="user-name">name</div>
                <div className="user-role">position du user</div>
              </div>
              <ChevronDown size={14} color="#aaa" />
            </div>
          </div>
        </div>

        <div className="page-content">
          {activeNav === 'dashboard'    && <PageDashboard />}
          {activeNav === 'statistiques' && <PageStatistiques />}
          {activeNav === 'signalements' && <Signalements />}
          {activeNav === 'carte'        && <Carte />}
          {activeNav === 'users'        && <Utilisateurs />}
          {!['dashboard', 'statistiques', 'signalements', 'carte', 'users'].includes(activeNav) && (
            <div className="page-placeholder">
              <p>Section <strong>{activeNav}</strong> — à implémenter</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}