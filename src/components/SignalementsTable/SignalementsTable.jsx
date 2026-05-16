import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import './SignalementsTable.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

const data = [
  { msisdn: '2130697...', type: 'coupureReseau',       region: 'babEzzouar',  status: 'enAttente', action: 'traiter' },
  { msisdn: '2130661...', type: 'faibleSignal',        region: 'darElBeida', status: 'enCours',   action: 'voir' },
  { msisdn: '2130550...', type: 'absenceCouverture',   region: 'algerCentre', status: 'resolu',     action: 'voir' },
  { msisdn: '2130770...', type: 'congestionReseau',    region: 'sidiMhamed', status: 'enAttente', action: 'traiter' },
  { msisdn: '2130699...', type: 'lenteurConnexion',    region: 'elHarrach',   status: 'enCours',   action: 'voir' },
  { msisdn: '2130612...', type: 'coupureReseau',       region: 'kouba',        status: 'resolu',     action: 'voir' },
  { msisdn: '2130733...', type: 'faibleSignal',        region: 'darElBeida', status: 'enAttente', action: 'traiter' },
  { msisdn: '2130845...', type: 'absenceCouverture',   region: 'babEzzouar',  status: 'enCours',   action: 'voir' },
  { msisdn: '2130911...', type: 'congestionReseau',    region: 'algerCentre', status: 'resolu',     action: 'voir' },
  { msisdn: '2130422...', type: 'lenteurConnexion',    region: 'elHarrach',   status: 'enAttente', action: 'traiter' },
];

const statusClass = {
  enAttente: 'badge-warning',
  enCours:   'badge-info',
  resolu:    'badge-success',
};

export default function SignalementsTable() {
  const { lang } = useLang();
  const tb = t.dashboard.table;
  const [page, setPage] = useState(1);
  const totalPages = 40;

  return (
    <div className="table-card">
      <div className="table-header">
        <h3>{tb.title[lang]}</h3>
        <div className="table-controls">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input className="search-input" placeholder={tb.searchPlaceholder[lang]} />
          </div>
          <div className="filter-dropdown">
            <span>{tb.filterAllTypes[lang]}</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="table-scroll">
        <table className="sig-table">
          <thead>
            <tr>
              {[tb.colMsisdn, tb.colType, tb.colRegion, tb.colStatus, tb.colAction].map(col => (
                <th key={col[lang]}>{col[lang]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const rowTypeLabel = t.signalements.problemTypes[row.type]?.[lang] ?? row.type;
              const rowRegionLabel = t.signalements.regions[row.region]?.[lang] ?? row.region;
              const rowStatusLabel = t.signalements.status[row.status]?.[lang] ?? row.status;
              const actionLabel = row.action === 'traiter' ? tb.actionTraiter[lang] : tb.actionVoir[lang];

              return (
                <tr key={i}>
                  <td>{row.msisdn}</td>
                  <td>{rowTypeLabel}</td>
                  <td>{rowRegionLabel}</td>
                  <td>
                    <span className={`badge ${statusClass[row.status]}`}>{rowStatusLabel}</span>
                  </td>
                  <td>
                    <button className={`action-btn ${row.action === 'traiter' ? 'btn-dark' : 'btn-light'}`}>
                      {actionLabel}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>
          <ChevronLeft size={14} />
        </button>
        {[1, 2, 3, 4].map(n => (
          <button key={n} className={`page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
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