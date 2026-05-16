import { useState } from 'react';
import { Search, Eye, Ban, ChevronLeft, ChevronRight, Users, UserCheck, UserX, X } from 'lucide-react';
import './Utilisateurs.css';
import t from '../../translations.json';
import { useLang } from '../../context/LanguageContext';

const allData = [
  { msisdn: '213697******', date: '12/01/26', signalements: 3,  status: 'actif' },
  { msisdn: '213698******', date: '10/01/26', signalements: 6,  status: 'suspendu' },
  { msisdn: '213699******', date: '19/12/25', signalements: 10, status: 'actif' },
  { msisdn: '213700******', date: '12/12/25', signalements: 9,  status: 'actif' },
  { msisdn: '213701******', date: '9/12/25',  signalements: 5,  status: 'suspendu' },
  { msisdn: '213702******', date: '8/12/25',  signalements: 2,  status: 'actif' },
  { msisdn: '213703******', date: '7/12/25',  signalements: 14, status: 'actif' },
  { msisdn: '213704******', date: '6/12/25',  signalements: 1,  status: 'suspendu' },
  { msisdn: '213705******', date: '5/12/25',  signalements: 7,  status: 'actif' },
  { msisdn: '213706******', date: '4/12/25',  signalements: 3,  status: 'suspendu' },
  { msisdn: '213707******', date: '3/12/25',  signalements: 8,  status: 'actif' },
  { msisdn: '213708******', date: '2/12/25',  signalements: 11, status: 'actif' },
  { msisdn: '213709******', date: '1/12/25',  signalements: 4,  status: 'suspendu' },
  { msisdn: '213710******', date: '30/11/25', signalements: 6,  status: 'actif' },
  { msisdn: '213711******', date: '29/11/25', signalements: 9,  status: 'actif' },
];

export default function Utilisateurs() {
  const { lang } = useLang();
  const u = t.utilisateurs;

  const [search, setSearch]             = useState('');
  const [filter, setFilter]             = useState('tous');
  const [page, setPage]                 = useState(1);
  const [showModal, setShowModal]       = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [raison, setRaison]             = useState('');
  const [dateDebut, setDateDebut]       = useState('');
  const [dateFin, setDateFin]           = useState('');
  const totalPages = 40;

  const filtered = allData.filter(row => {
    const matchSearch = row.msisdn.includes(search);
    const matchFilter = filter === 'tous' || row.status === filter;
    return matchSearch && matchFilter;
  });

  const openModal  = (user) => { setSelectedUser(user); setRaison(''); setDateDebut(''); setDateFin(''); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedUser(null); };
  const handleEnregistrer = () => { console.log({ user: selectedUser, raison, dateDebut, dateFin }); closeModal(); };

  return (
    <div className="util-page">

      {/* Stats */}
      <div className="util-stats">
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#e8f5ee' }}>
            <Users size={22} color="#1b6b3a" />
          </div>
          <div>
            <p className="util-stat-label">{u.stats.total[lang]}</p>
            <p className="util-stat-value">5 631</p>
          </div>
        </div>
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#e8f5ee' }}>
            <UserCheck size={22} color="#1b6b3a" />
          </div>
          <div>
            <p className="util-stat-label">{u.stats.actifs[lang]}</p>
            <p className="util-stat-value">4 882</p>
          </div>
        </div>
        <div className="util-stat-card">
          <div className="util-stat-icon" style={{ background: '#fff0f0' }}>
            <UserX size={22} color="#e63946" />
          </div>
          <div>
            <p className="util-stat-label">{u.stats.suspendus[lang]}</p>
            <p className="util-stat-value">214</p>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="util-table-card">
        <div className="util-topbar">
          <div className="util-search-wrap">
            <Search size={14} color="#aaa" />
            <input
              className="util-search"
              placeholder={u.searchPlaceholder[lang]}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="util-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="tous">{u.filter.tous[lang]}</option>
            <option value="actif">{u.filter.actif[lang]}</option>
            <option value="suspendu">{u.filter.suspendu[lang]}</option>
          </select>
        </div>

        <div className="util-table-scroll">
          <table className="util-table">
            <thead>
              <tr>
                {[u.table.colMsisdn, u.table.colDate, u.table.colSignalements, u.table.colStatus, u.table.colAction].map(col => (
                  <th key={col[lang]}>{col[lang]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  <td>{row.msisdn}</td>
                  <td>{row.date}</td>
                  <td>{row.signalements}</td>
                  <td>
                    <span className={`util-badge ${row.status === 'actif' ? 'badge-actif' : 'badge-suspendu'}`}>
                      {u.status[row.status][lang]}
                    </span>
                  </td>
                  <td>
                    <div className="util-actions">
                      <button className="util-action-btn view"><Eye size={14} /></button>
                      <button className="util-action-btn ban" onClick={() => openModal(row)}><Ban size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="util-pagination">
          <button className="util-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={14} /></button>
          {[1, 2, 3, 4].map(n => (
            <button key={n} className={`util-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
          ))}
          <span className="util-page-dots">...</span>
          <button className="util-page-btn" onClick={() => setPage(totalPages)}>{totalPages}</button>
          <button className="util-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}><ChevronRight size={14} /></button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{u.modal.title[lang]}</h3>
              <button className="modal-close" onClick={closeModal}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>{u.modal.raisonLabel[lang]}</label>
                <textarea
                  className="modal-textarea"
                  placeholder={u.modal.raisonPlaceholder[lang]}
                  value={raison}
                  onChange={e => setRaison(e.target.value)}
                />
              </div>
              <div className="modal-field">
                <label>{u.modal.dateDebut[lang]}</label>
                <div className="modal-input-wrap">
                  <input type="date" className="modal-input" value={dateDebut} onChange={e => setDateDebut(e.target.value)} />
                </div>
              </div>
              <div className="modal-field">
                <label>{u.modal.dateFin[lang]}</label>
                <div className="modal-input-wrap">
                  <input type="date" className="modal-input" value={dateFin} onChange={e => setDateFin(e.target.value)} />
                </div>
              </div>
              <button className="modal-submit" onClick={handleEnregistrer}>{u.modal.submitBtn[lang]}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}