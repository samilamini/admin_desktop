import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import './SignalementsTable.css';

const data = [
  { msisdn: '2130697...', type: 'Coupure réseau',       region: 'Bab Ezzouar',  status: 'En attente', action: 'Traiter' },
  { msisdn: '2130661...', type: 'Faible signal',        region: 'Dar El Beida', status: 'En cours',   action: 'Voir' },
  { msisdn: '2130550...', type: 'Absence couverture',   region: 'Alger-Centre', status: 'Résolu',     action: 'Voir' },
  { msisdn: '2130770...', type: 'Congestion réseau',    region: "Sidi M'Hamed", status: 'En attente', action: 'Traiter' },
  { msisdn: '2130699...', type: 'Lenteur de connexion', region: 'El Harrach',   status: 'En cours',   action: 'Voir' },
  { msisdn: '2130612...', type: 'Coupure réseau',       region: 'Kouba',        status: 'Résolu',     action: 'Voir' },
  { msisdn: '2130733...', type: 'Faible signal',        region: 'Dar El Beïda', status: 'En attente', action: 'Traiter' },
  { msisdn: '2130845...', type: 'Absence couverture',   region: 'Bab Ezzouar',  status: 'En cours',   action: 'Voir' },
  { msisdn: '2130911...', type: 'Congestion réseau',    region: 'Alger-Centre', status: 'Résolu',     action: 'Voir' },
  { msisdn: '2130422...', type: 'Lenteur de connexion', region: 'El Harrach',   status: 'En attente', action: 'Traiter' },
];

const statusClass = {
  'En attente': 'badge-warning',
  'En cours':   'badge-info',
  'Résolu':     'badge-success',
};

export default function SignalementsTable() {
  const [page, setPage] = useState(1);
  const totalPages = 40;

  return (
    <div className="table-card">

      <div className="table-header">
        <h3>Derniers signalements</h3>
        <div className="table-controls">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input className="search-input" placeholder="Recherche..." />
          </div>
          <div className="filter-dropdown">
            <span>tous types</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Zone scrollable */}
      <div className="table-scroll">
        <table className="sig-table">
          <thead>
            <tr>
              {['MSISDN', 'Type', 'Région', 'Statut', 'Action'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.msisdn}</td>
                <td>{row.type}</td>
                <td>{row.region}</td>
                <td>
                  <span className={`badge ${statusClass[row.status]}`}>{row.status}</span>
                </td>
                <td>
                  <button className={`action-btn ${row.action === 'Traiter' ? 'btn-dark' : 'btn-light'}`}>
                    {row.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination fixe en bas */}
      <div className="pagination">
        <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>
          <ChevronLeft size={14} />
        </button>
        {[1, 2, 3, 4].map(n => (
          <button
            key={n}
            className={`page-btn ${page === n ? 'active' : ''}`}
            onClick={() => setPage(n)}
          >{n}</button>
        ))}
        <span className="page-dots">...</span>
        <button className="page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
        <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}