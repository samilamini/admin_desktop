import { useState } from 'react';
import { Search, Eye, Download, FileText, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import './Rapports.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

export default function Rapports() {
  const { lang } = useLang();
  const r = t.rapports;

  const rapports = [
    { id: 1, titleKey: 'report1Title', typeKey: 'regionReports',      badgeClass: 'rap-badge-region',  periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 14:30', taille: '2.45 MB' },
    { id: 2, titleKey: 'report2Title', typeKey: 'problemAnalysis',     badgeClass: 'rap-badge-analyse', periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 13:45', taille: '1.82 MB' },
    { id: 3, titleKey: 'report3Title', typeKey: 'networkPerformance',  badgeClass: 'rap-badge-perf',    periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 13:20', taille: '3.12 MB' },
    { id: 4, titleKey: 'report4Title', typeKey: 'users',               badgeClass: 'rap-badge-users',   periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 12:50', taille: '1.25 MB' },
    { id: 5, titleKey: 'report5Title', typeKey: 'executiveSummary',    badgeClass: 'rap-badge-resume',  periode: '01/05/2025 - 31/05/2025', date: '31/05/2025 12:10', taille: '1.05 MB' },
  ];

  const [search, setSearch] = useState('');
  const [page, setPage]     = useState(1);

  const filtered = rapports.filter(row =>
    r.sampleData[row.titleKey][lang].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rap-page">
      <div className="rap-generate-card">
        <h3>{r.generate.sectionTitle[lang]}</h3>
        <div className="rap-form-row">
          <div className="rap-form-field">
            <label>{r.generate.reportType[lang]}</label>
            <select className="rap-select">
              {Object.entries(r.reportTypes).map(([key, val]) => (
                <option key={key}>{val[lang]}</option>
              ))}
            </select>
          </div>
          <div className="rap-form-field">
            <label>{r.generate.region[lang]}</label>
            <select className="rap-select">
              {Object.entries(r.regions).map(([key, val]) => (
                <option key={key}>{val[lang]}</option>
              ))}
            </select>
          </div>
          <div className="rap-form-field">
            <label>{r.generate.problemType[lang]}</label>
            <select className="rap-select">
              {Object.entries(r.problemTypes).map(([key, val]) => (
                <option key={key}>{val[lang]}</option>
              ))}
            </select>
          </div>
          <div className="rap-form-field" style={{ flex: '0 0 auto' }}>
            <label>{r.generate.period[lang]}</label>
            <div className="rap-date-wrap">
              <input type="date" className="rap-date-input" defaultValue="2025-05-01" />
              <span className="rap-date-sep">–</span>
              <input type="date" className="rap-date-input" defaultValue="2025-05-31" />
            </div>
          </div>
          <button className="rap-generate-btn">
            <Download size={14} /> {r.generate.generateBtn[lang]}
          </button>
        </div>
        <div className="rap-info">
          <Info size={14} />
          {r.generate.perfTip[lang]}
        </div>
      </div>

      <div className="rap-table-card">
        <div className="rap-table-header">
          <h3>{r.table.sectionTitle[lang]}</h3>
          <div className="rap-search-wrap">
            <Search size={14} color="#aaa" />
            <input className="rap-search" placeholder={r.table.searchPlaceholder[lang]} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="rap-table-scroll">
          <table className="rap-table">
            <thead>
              <tr>
                {[r.table.colTitle, r.table.colType, r.table.colPeriod, r.table.colGeneratedAt, r.table.colSize, r.table.colActions].map(col => (
                  <th key={col[lang]}>{col[lang]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => (
                <tr key={row.id}>
                  <td>
                    <div className="rap-title-cell">
                      <FileText size={16} className="rap-file-icon" />
                      {r.sampleData[row.titleKey][lang]}
                    </div>
                  </td>
                  <td><span className={`rap-badge ${row.badgeClass}`}>{r.reportTypes[row.typeKey][lang]}</span></td>
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
          <span className="rap-count">
            {r.pagination.displaying[lang].replace('{count}', filtered.length).replace('{total}', filtered.length)}
          </span>
          <div className="rap-pagination">
            <button className="rap-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft size={14} /></button>
            {[1, 2, 3].map(n => (
              <button key={n} className={`rap-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
            ))}
            <button className="rap-page-btn" onClick={() => setPage(p => p + 1)} disabled={page === 3}><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}