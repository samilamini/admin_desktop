import { useState } from 'react';
import { Search, Eye, Settings, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Signalements.css';

const allData = [
  { msisdn: '213697******', type: 'Coupure réseau',      region: 'Bab Ezzouar',   cell: 'BTS-12 / A', date: '20/04 16:33', status: 'Résolu' },
  { msisdn: '213697******', type: 'Coupure réseau',      region: 'Dar El Beïda',  cell: 'BTS-07 / B', date: '20/04 16:33', status: 'Résolu' },
  { msisdn: '213697******', type: 'Faible signal',       region: 'Alger-Centre',  cell: 'BTS-03 / C', date: '20/04 16:33', status: 'Résolu' },
  { msisdn: '213697******', type: 'Absence couverture',  region: "Sidi M'Hamed",  cell: 'BTS-09 / A', date: '20/04 16:33', status: 'En cours' },
  { msisdn: '213697******', type: 'Congestion réseau',   region: 'El Harrach',    cell: 'BTS-15 / B', date: '20/04 16:33', status: 'En cours' },
  { msisdn: '213697******', type: 'Faible signal',       region: 'Kouba',         cell: 'BTS-02 / C', date: '20/04 16:33', status: 'En cours' },
  { msisdn: '213697******', type: 'Lenteur de connexion',region: 'Bir Mourad Raïs',cell: 'BTS-06 / A', date: '20/04 16:33', status: 'En attente' },
  { msisdn: '213697******', type: 'Lenteur de connexion',region: 'Hydra',         cell: 'BTS-07 / A', date: '20/04 16:33', status: 'En attente' },
];

const statusConfig = {
  'Résolu':     { class: 'badge-success', label: 'Résolu' },
  'En cours':   { class: 'badge-info',    label: 'En cours' },
  'En attente': { class: 'badge-warning', label: 'En attente' },
};

const filters = ['Tous', 'En attente', 'En cours', 'Résolu'];

export default function Signalements() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [search, setSearch]             = useState('');
  const [region, setRegion]             = useState('toutes les regions');
  const [type, setType]                 = useState('tous les types');
  const [page, setPage]                 = useState(1);
  const totalPages = 40;

  const filtered = allData.filter(row => {
    const matchFilter = activeFilter === 'Tous' || row.status === activeFilter;
    const matchSearch = row.msisdn.includes(search) || row.type.toLowerCase().includes(search.toLowerCase()) || row.region.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'toutes les regions' || row.region === region;
    const matchType   = type === 'tous les types' || row.type === type;
    return matchFilter && matchSearch && matchRegion && matchType;
  });

  return (
    <div className="sig-page">

      <div className="sig-topbar">
        <div className="sig-search-wrap">
          <Search size={14} color="#aaa" />
          <input
            className="sig-search"
            placeholder="Recherche..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="sig-export-btn">
          ⬇ Export
        </button>
      </div>

      <div className="sig-filterbar">
        <div className="sig-tabs">
          {filters.map(f => (
  <button
    key={f}
    className={`sig-tab ${activeFilter === f ? 'active' : ''}`}
    onClick={() => { setActiveFilter(f); setPage(1); }}
  >
    {f}
  </button>
))}
        </div>

        <div className="sig-dropdowns">
          <select className="sig-select" value={region} onChange={e => setRegion(e.target.value)}>
            <option>toutes les regions</option>
            <option>Bab Ezzouar</option>
            <option>El Harrach</option>
            <option>Sidi M'Hamed</option>
            <option>Dar El Beïda</option>
            <option>Alger-Centre</option>
            <option>Kouba</option>
            <option>Bir Mourad Raïs</option>
            <option>Hydra</option>
          </select>
          <select className="sig-select" value={type} onChange={e => setType(e.target.value)}>
            <option>tous les types</option>
            <option>Coupure réseau</option>
            <option>Faible signal</option>
            <option>Absence couverture</option>
            <option>Congestion réseau</option>
            <option>Lenteur de connexion</option>
          </select>
        </div>
      </div>

      <div className="sig-table-wrap">
        <table className="sig-table">
          <thead>
            <tr>
              {['MSISDN', 'Type de problème', 'Région', 'Cell ID', 'Date', 'Status', 'Action'].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                <td>{row.msisdn}</td>
                <td>{row.type}</td>
                <td>{row.region}</td>
                <td>{row.cell}</td>
                <td>{row.date}</td>
                <td>
                  <span className={`sig-badge ${statusConfig[row.status].class}`}>
                    {statusConfig[row.status].label}
                  </span>
                </td>
                <td>
                  <div className="sig-actions">
                    <button className="sig-action-btn view"><Eye size={14} /></button>
                    <button className="sig-action-btn edit"><Settings size={14} /></button>
                    <button className="sig-action-btn delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sig-pagination">
        <button className="sig-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>
          <ChevronLeft size={14} />
        </button>
        {[1, 2, 3, 4].map(n => (
          <button
            key={n}
            className={`sig-page-btn ${page === n ? 'active' : ''}`}
            onClick={() => setPage(n)}
          >{n}</button>
        ))}
        <span className="sig-page-dots">...</span>
        <button className="sig-page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
        <button className="sig-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}