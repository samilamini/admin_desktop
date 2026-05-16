import { useState } from 'react';
import { Search, Eye, Settings, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import './Signalements.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

const allData = [
  { msisdn: '213697******', type: 'coupureReseau',       region: 'babEzzouar',     cell: 'BTS-12 / A', date: '20/04 16:33', status: 'resolu' },
  { msisdn: '213697******', type: 'coupureReseau',       region: 'darElBeida',    cell: 'BTS-07 / B', date: '20/04 16:33', status: 'resolu' },
  { msisdn: '213697******', type: 'faibleSignal',        region: 'algerCentre',    cell: 'BTS-03 / C', date: '20/04 16:33', status: 'resolu' },
  { msisdn: '213697******', type: 'absenceCouverture',   region: 'sidiMhamed',    cell: 'BTS-09 / A', date: '20/04 16:33', status: 'enCours' },
  { msisdn: '213697******', type: 'congestionReseau',    region: 'elHarrach',      cell: 'BTS-15 / B', date: '20/04 16:33', status: 'enCours' },
  { msisdn: '213697******', type: 'faibleSignal',        region: 'kouba',           cell: 'BTS-02 / C', date: '20/04 16:33', status: 'enCours' },
  { msisdn: '213697******', type: 'lenteurConnexion',    region: 'birMouradRais', cell: 'BTS-06 / A', date: '20/04 16:33', status: 'enAttente' },
  { msisdn: '213697******', type: 'lenteurConnexion',    region: 'hydra',           cell: 'BTS-07 / A', date: '20/04 16:33', status: 'enAttente' },
];

const statusConfig = {
  resolu:     { class: 'badge-success' },
  enCours:    { class: 'badge-info'    },
  enAttente:  { class: 'badge-warning' },
};

export default function Signalements() {
  const { lang } = useLang();
  const s  = t.signalements;
  const tb = t.signalements.table;

  const filterKeys = ['tous', 'enAttente', 'enCours', 'resolu'];

  const [activeFilterKey, setActiveFilterKey] = useState('tous');
  const [search, setSearch]                   = useState('');
  const [region, setRegion]                   = useState('allRegions');
  const [type, setType]                       = useState('allTypes');
  const [page, setPage]                       = useState(1);
  const totalPages = 40;

  const filtered = allData.filter(row => {
    const activeLabel = s.filters[activeFilterKey][lang];
    const rowStatusLabel = t.signalements.status[row.status]?.[lang] ?? row.status;
    const rowRegionLabel = t.signalements.regions[row.region]?.[lang] ?? row.region;
    const rowTypeLabel = t.signalements.problemTypes[row.type]?.[lang] ?? row.type;
    const matchFilter = activeFilterKey === 'tous' || rowStatusLabel === activeLabel;
    const matchSearch = row.msisdn.includes(search)
      || rowTypeLabel.toLowerCase().includes(search.toLowerCase())
      || rowRegionLabel.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'allRegions' || rowRegionLabel === s.regions[region]?.[lang];
    const matchType   = type === 'allTypes'   || rowTypeLabel   === s.problemTypes[type]?.[lang];
    return matchFilter && matchSearch && matchRegion && matchType;
  });

  return (
    <div className="sig-page">

      <div className="sig-topbar">
        <div className="sig-search-wrap">
          <Search size={14} color="#aaa" />
          <input className="sig-search" placeholder={s.searchPlaceholder[lang]} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="sig-export-btn">⬇ {t.common.export[lang]}</button>
      </div>

      <div className="sig-filterbar">
        <div className="sig-tabs">
          {filterKeys.map(key => (
            <button
              key={key}
              className={`sig-tab ${activeFilterKey === key ? 'active' : ''}`}
              onClick={() => { setActiveFilterKey(key); setPage(1); }}
            >
              {s.filters[key][lang]}
            </button>
          ))}
        </div>
        <div className="sig-dropdowns">
          <select className="sig-select" value={region} onChange={e => setRegion(e.target.value)}>
            <option value="allRegions">{s.dropdowns.allRegions[lang]}</option>
            {Object.entries(s.regions).map(([key, val]) => (
              <option key={key} value={key}>{val[lang]}</option>
            ))}
          </select>
          <select className="sig-select" value={type} onChange={e => setType(e.target.value)}>
            <option value="allTypes">{s.dropdowns.allTypes[lang]}</option>
            {Object.entries(s.problemTypes).map(([key, val]) => (
              <option key={key} value={key}>{val[lang]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="sig-table-wrap">
        <div className="sig-table-scroll">
          <table className="sig-table">
            <thead>
              <tr>
                {[tb.colMsisdn, tb.colType, tb.colRegion, tb.colCellId, tb.colDate, tb.colStatus, tb.colAction].map(col => (
                  <th key={col[lang]}>{col[lang]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => {
                const rowStatusLabel = t.signalements.status[row.status]?.[lang] ?? row.status;
                const rowRegionLabel = t.signalements.regions[row.region]?.[lang] ?? row.region;
                const rowTypeLabel = t.signalements.problemTypes[row.type]?.[lang] ?? row.type;
                return (
                  <tr key={i}>
                    <td>{row.msisdn}</td>
                    <td>{rowTypeLabel}</td>
                    <td>{rowRegionLabel}</td>
                    <td>{row.cell}</td>
                    <td>{row.date}</td>
                    <td>
                      <span className={`sig-badge ${statusConfig[row.status].class}`}>{rowStatusLabel}</span>
                    </td>
                    <td>
                      <div className="sig-actions">
                        <button className="sig-action-btn view"><Eye size={14} /></button>
                        <button className="sig-action-btn edit"><Settings size={14} /></button>
                        <button className="sig-action-btn delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="sig-pagination">
          <button className="sig-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={14} /></button>
          {[1, 2, 3, 4].map(n => (
            <button key={n} className={`sig-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <span className="sig-page-dots">...</span>
          <button className="sig-page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
          <button className="sig-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}