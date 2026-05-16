import { useState } from 'react';
import { Search, Eye, Download, FileText, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import './Rapports.css';

const rapports = [
  { id: 1, titre: 'Signalements par région - Mai 2025', type: 'Signalements par région', badgeClass: 'rap-badge-region',  periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 14:30', taille: '2.45 MB' },
  { id: 2, titre: 'Analyse des problèmes - Mai 2025',   type: 'Analyse des problèmes',   badgeClass: 'rap-badge-analyse', periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 13:45', taille: '1.82 MB' },
  { id: 3, titre: 'Performance réseau - Mai 2025',      type: 'Performance réseau',       badgeClass: 'rap-badge-perf',    periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 13:20', taille: '3.12 MB' },
  { id: 4, titre: 'Utilisateurs actifs - Mai 2025',     type: 'Utilisateurs',             badgeClass: 'rap-badge-users',   periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 12:50', taille: '1.25 MB' },
  { id: 5, titre: 'Résumé exécutif - Mai 2025',         type: 'Résumé exécutif',          badgeClass: 'rap-badge-resume',  periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 12:10', taille: '1.05 MB' },
];

export default function Rapports() {
  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);

  const filtered = rapports.filter(r =>
    r.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rap-page">

      <div className="rap-generate-card">
        <h3>Générer un rapport</h3>
        <div className="rap-form-row">
          <div className="rap-form-field">
            <label>TYPE DE RAPPORT</label>
            <select className="rap-select">
              <option>Signalements par région</option>
              <option>Analyse des problèmes</option>
              <option>Performance réseau</option>
              <option>Utilisateurs</option>
              <option>Résumé exécutif</option>
            </select>
          </div>
          <div className="rap-form-field">
            <label>RÉGION</label>
            <select className="rap-select">
              <option>Toutes les régions</option>
              <option>Bab Ezzouar</option>
              <option>El Harrach</option>
              <option>Sidi M'Hamed</option>
              <option>Alger-Centre</option>
            </select>
          </div>
          <div className="rap-form-field">
            <label>TYPE DE PROBLÈME</label>
            <select className="rap-select">
              <option>Tous les types</option>
              <option>Coupure réseau</option>
              <option>Faible signal</option>
              <option>Congestion réseau</option>
            </select>
          </div>
          <div className="rap-form-field" style={{ flex: '0 0 auto' }}>
            <label>PÉRIODE</label>
            <div className="rap-date-wrap">
              <input type="date" className="rap-date-input" defaultValue="2025-05-01" />
              <span className="rap-date-sep">–</span>
              <input type="date" className="rap-date-input" defaultValue="2025-05-31" />
            </div>
          </div>
          <button className="rap-generate-btn">
            <Download size={14} /> Générer le rapport
          </button>
        </div>
        <div className="rap-info">
          <Info size={14} />
          Pour des performances optimales, veuillez sélectionner une période ne dépassant pas 1 mois.
        </div>
      </div>

      <div className="rap-table-card">
        <div className="rap-table-header">
          <h3>Rapports générés</h3>
          <div className="rap-search-wrap">
            <Search size={14} color="#aaa" />
            <input
              className="rap-search"
              placeholder="Rechercher un rapport..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="rap-table-scroll">
          <table className="rap-table">
            <thead>
              <tr>
                {['Titre du rapport', 'Type de rapport', 'Période', 'Généré le', 'Taille', 'Actions'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td>
                    <div className="rap-title-cell">
                      <FileText size={16} className="rap-file-icon" />
                      {row.titre}
                    </div>
                  </td>
                  <td>
                    <span className={`rap-badge ${row.badgeClass}`}>{row.type}</span>
                  </td>
                  <td>{row.periode}</td>
                  <td>{row.date}</td>
                  <td>{row.taille}</td>
                  <td>
                    <div className="rap-actions">
                      <button className="rap-action-btn view"><Eye size={14} /></button>
                      <button className="rap-action-btn download"><Download size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rap-footer">
          <span className="rap-count">Affichage de 1 à {filtered.length} sur {filtered.length} rapports</span>
          <div className="rap-pagination">
            <button className="rap-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>
              <ChevronLeft size={14} />
            </button>
            <button className="rap-page-btn active">1</button>
            <button className="rap-page-btn" onClick={() => setPage(p => p + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}